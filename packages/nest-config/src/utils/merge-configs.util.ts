import set from "lodash.set";

export function mergeConfigObject(
    host: Record<string, unknown>,
    partial: Record<string, unknown>,
    token?: string
) {
    if (token) {
        set(host, token, partial);
        return partial;
    }
    Object.assign(host, partial);
}
