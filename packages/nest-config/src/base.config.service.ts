import { Inject, Injectable, Optional } from "@nestjs/common";
import get from "lodash.get";
import {
	CONFIGURATION_TOKEN,
	VALIDATED_ENV_PROPNAME,
} from "./config.constants";
import { NoInferType } from "./types";
import Joi from "joi";
import { PrefixLogger } from "@toes/core";
import { ProxyStore } from "@sebastianspeitel/proxystore";

export abstract class BaseConfigService<
	K extends {} = Record<PropertyKey, unknown>
> {
	constructor(
		protected validate: boolean,
		protected internalConfig: ProxyStore<K>
	) {
		if (validate) {
			const schema = this.getValidationSchema();
			const res = schema.validate(this.internalConfig);
			if (res.error)
				new PrefixLogger("Config Validation").error(res.error.message);
			else this.internalConfig = res.value;
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
