type ConfigFactoryReturnValue =
  | Record<string, unknown>
  | Promise<Record<string, unknown>>;

export type ConfigFactory<
  T extends ConfigFactoryReturnValue = ConfigFactoryReturnValue
> = () => T;
