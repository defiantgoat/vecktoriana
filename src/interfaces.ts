export interface ReduxAction {
  type: string;
  payload: Record<string, unknown> | null;
}

export interface StateConfig {
  user: any | null;
}
