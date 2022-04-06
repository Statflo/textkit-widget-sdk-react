module.exports = {
    extends: ['@commitlint/config-conventional'],
    ignores: [
        (message) => message.includes('(release)') || message.includes('(prerelease)'),
    ]
};