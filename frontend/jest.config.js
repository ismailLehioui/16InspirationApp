module.exports = {
    transformIgnorePatterns: [
        "/node_modules/(?!axios)/"  // Transforme axios et d'autres modules qui utilisent ES Modules
    ],
};
