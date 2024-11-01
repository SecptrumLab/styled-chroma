type StateActionType<T> = {
  action: (state: T) => void;
};

type StateEffectType<T> = {
  effect: (state: T) => void;
  dependencies?: (keyof T)[];
  revalidate?: keyof T;
};

const reactive = <T extends object>(initialState: T) => {
  return new Proxy<T>(initialState, {
    get: (target, key) => target[key as keyof T],
  });
};

/**
 * Create a state that will be reactive
 * @param initialState - The initial state
 * @returns The state
 * @example
 * const initialState = { count: 0 };
 * const state = createState<typeof initialState>(initialState, []);
 * state.count++;
 */
export const createState = <T extends object>(
  initialState: T,
  actions: StateActionType<T>[],
  revalidate?: keyof T
) => {
  const state = reactive(initialState);
  actions.forEach((action) => action.action(state));

  if (revalidate) {
    return new Proxy(state, {
      set(target: T, property: string | symbol, value: any) {
        target[property as keyof T] = value;
        if (property === revalidate) {
          actions.forEach((action) => action.action(state));
        }
        return true;
      },
    });
  }

  return state;
};

/**
 * Create an effect that will run when the state changes
 * @param state - The state to watch
 * @param effect - The effect to run
 * @returns The state
 * @example
 * const state = createState<typeof initialState>(initialState, []);
 * const effect = createEffect(state, { effect: (state) => console.log(state.count) });
 * effect.count++;
 */
export const createEffect = <T extends object>(
  state: T,
  effect: StateEffectType<T>
) => {
  const { effect: effectFn, revalidate } = effect;

  if (typeof effectFn !== "function") {
    throw new Error("Effect function is not defined or is not a function");
  }

  // Execute the effect function with the initial state
  const executeEffect = () => {
    effectFn(state);
  };

  executeEffect(); // Run initially

  // Handle revalidation if specified
  if (revalidate) {
    const handler = {
      set(target: T, property: keyof T, value: any) {
        target[property] = value;
        if (property === revalidate) {
          executeEffect(); // Re-run effect if the revalidate key changes
        }
        return true;
      },
    };

    // Create a proxy for the state to watch for changes
    return new Proxy(state, handler as ProxyHandler<T>);
  }

  return state; // Return the state if no revalidate is specified
};
