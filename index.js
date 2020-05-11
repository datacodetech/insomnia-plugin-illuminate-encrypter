module.exports.templateTags = [
    {
        name: "illuminate_encrypt",
        displayName: "Illuminate Encrypt",
        description: "Encrypt a value for Illuminate\\Encryption\\Encrypter::decrypt()",
        args: [
            {
                displayName: "Encryption key",
                description: "",
                type: "string",
                placeholder: "32 character key",
            },
            {
                displayName: "Cipher",
                description: "",
                type: "enum",
                options: [
                    { displayName: "AES-128-CBC", value: "AES-128-CBC" },
                    { displayName: "AES-256-CBC", value: "AES-256-CBC" },
                ],
            },
            {
                displayName: "Value",
                description: "The value to be encrypted",
                type: "string",
            },
        ],
        async run (context, key, cipher, value) {
            return "test";
        },
    },
];
