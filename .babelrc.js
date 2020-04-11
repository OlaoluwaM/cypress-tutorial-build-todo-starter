module.exports = (api) => {
  const isDevelopment = api.env() === "development";

  return {
    presets: [
      ["@babel/preset-env", { modules: isDevelopment ? "commonjs" : false }],
      "@babel/preset-react",
    ],
    plugins: [
      [
        "transform-inline-environment-variables",
        {
          include: ["NODE_ENV"],
        },
      ],
    ],
  };
};
