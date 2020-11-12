import get from "lodash.get";
import Joi from "joi";
import { PrefixLogger } from "@toes/core";
import { ProxyStoreJSON } from "@sebastianspeitel/proxystore";

export abstract class BaseConfigService<
	K extends {} = Record<PropertyKey, unknown>
> {
	protected internalConfig: ProxyStoreJSON<K>;

	constructor(
		protected validate: boolean,
		protected configPath: string,
		defaultConfig?: K
	) {
		this.internalConfig = new ProxyStoreJSON(defaultConfig, {
			path: configPath,
		});
		if (validate) {
			const schema = this.getValidationSchema();
			const res = schema.validate(this.internalConfig);
			if (res.error)
				new PrefixLogger("Config Validation").error(res.error.message);
			else {
				defaultConfig = res.value;
				this.internalConfig = new ProxyStoreJSON(defaultConfig, {
					path: configPath,
				});
			}
		}
	}

	abstract getValidationSchema(): Joi.ObjectSchema;
	/**
	 * Get a configuration value (either custom configuration or process environment variable)
	 * based on property path (you can use dot notation to traverse nested object, e.g. "database.host").
	 * It returns a default value if the key does not exist.
	 * @param propertyPath
	 * @param defaultValue
	 */
	get<T = unknown>(propertyPath: keyof K, defaultValue?: T): T | undefined {
		const splitPath = (propertyPath as string).split(".");
		const processValue = get(process.env, propertyPath);
		if (typeof processValue != "undefined")
			return (processValue as unknown) as T;

		const internalValue = this.internalConfig.get(
			splitPath.splice(-1, 1),
			splitPath[splitPath.length - 1]
		);
		return typeof internalValue === "undefined"
			? defaultValue
			: internalValue;
	}
	set<T = unknown>(propertyPath: keyof K, value: T): boolean {
		const splitPath = (propertyPath as string).split(".");

		return this.internalConfig.set(
			splitPath.splice(-1, 1),
			splitPath[splitPath.length - 1],
			value
		);
	}
}
