const crypto = require("crypto");

module.exports.templateTags = [
    {
        name: "illuminate_encrypt",
        displayName: "Illuminate Encrypt",
        description: "Encrypt a value for Illuminate\\Encryption\\Encrypter::decryptString()",
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
        async run (context, key, algorithm, value) {
            // Based on https://github.com/illuminate/encryption/blob/master/Encrypter.php#L82
            // The encrypt() method from Illuminate\Encryption\Encrypter

            const iv = crypto.randomBytes(16);
            const ivBase64 = Buffer.from(iv).toString("base64");

            const cipher = crypto.createCipheriv(algorithm, key, iv)
            const hmac = crypto.createHmac("SHA256", key)

            const payload = cipher.update(value, "utf8", "base64")
                          + cipher.final("base64");

            hmac.update(`${ivBase64}${payload}`);
            const hash = hmac.digest("hex");

            const resultData = {
                iv: ivBase64,
                value: payload,
                mac: hash,
            };

            const resultJson = JSON.stringify(resultData);
            const resultJsonBase64 = Buffer.from(resultJson).toString("base64");

            return resultJsonBase64;
        },
    },
];
