const REGEX = new RegExp(
	"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);
export const isCamelCase = (key: string) => REGEX.test(key);
