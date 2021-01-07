if (process.env.NODE_ENV === "production") {
    export * from "./rootz-core-prod"
} else {
    export * from "./rootz-core"
}