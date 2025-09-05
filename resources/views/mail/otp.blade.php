<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>OTP Verification</title>
</head>

<body style="background-color: #f4f4f4; font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333;">
    <!-- Outer Container -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <!-- Inner Container -->
                <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0"
                    style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 20px; background-color: #2a2a2a;">
                            <img src="https://api.nipemchongo.seswarenexus.com/storage/logo.png" alt="Nipe Mchongo"
                                width="140" style="display: block;">
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 30px;">
                            <p style="font-size: 18px; font-weight: bold; margin: 0 0 15px;">Hello {{$name}},</p>

                            <p style="font-size: 15px; margin: 0 0 10px; color: #444;">
                                Use the one-time password (OTP) below to complete your verification:
                            </p>

                            <!-- OTP Box -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <p style="font-size: 28px; font-weight: bold; color: #2a2a2a; margin: 0; letter-spacing: 2px;">
                                            {{$otp}}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size: 14px; margin: 15px 0 10px; color: #666;">
                                ⏳ This code will expire in <strong>5 minutes</strong>.
                            </p>

                            <p style="font-size: 13px; margin: 10px 0; color: #999;">
                                ⚠️ If you did not request this code, please ignore this email or contact our support team.
                            </p>

                            <p style="margin: 25px 0 0; font-size: 14px; color: #333;">
                                Thanks,<br>
                                <strong>Nipe Mchongo Team</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #fafafa; padding: 20px; font-size: 12px; color: #777;">
                            <p style="margin: 0;">Need help? Contact us at
                                <a href="mailto:hello@example.com" style="color: #2a2a2a; text-decoration: none;">hello@example.com</a>
                            </p>
                            <p style="margin: 5px 0 0;">&copy; {{ date('Y') }} Nipe Mchongo. All rights reserved.</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
