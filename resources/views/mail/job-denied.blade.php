<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Gig Application Update - Nipe Mchongo</title>
</head>

<body style="background-color: #f4f4f4; font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333;">

    <!-- Outer Container -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
        style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <!-- Inner Container -->
                <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0"
                    style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 20px; background-color: #2a2a2a;">
                            <img src="https://api.nipemchongo.seswarenexus.com/storage/logo.png"
                                alt="Nipe Mchongo" width="140" style="display: block;">
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 30px;">
                            <p style="font-size: 18px; font-weight: bold; margin: 0 0 15px;">
                                Hello {{ $user['firstname'] }},
                            </p>

                            <p style="font-size: 16px; margin: 0 0 20px; color: #444;">
                                We have a feedback update regarding your application for:
                            </p>

                            <!-- Job Title Card -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
                                style="background-color: #fafafa; border: 1px solid #eee; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
                                <tr>
                                    <td style="font-size: 16px; font-weight: bold; color: #2a2a2a;">
                                        {{ $job->title }}
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0 0 15px; font-size: 15px; color: #c0392b; font-weight: bold;">
                                ❌ Unfortunately, your application was not accepted by the gig owner.
                            </p>

                            <p style="margin: 0 0 15px; font-size: 15px; color: #555;">
                                Don’t be discouraged — every application is a step forward. There are many other opportunities waiting for you on <strong>Nipe Mchongo</strong>.
                            </p>

                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"
                                style="margin: 25px auto;">
                                <tr>
                                    <td align="center" bgcolor="#2a2a2a" style="border-radius: 6px;">
                                        <a href="https://nipemchongo.seswarenexus.com"
                                            style="display: inline-block; padding: 12px 24px; font-size: 15px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: #2a2a2a;">
                                            🔎 Explore More Gigs
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 20px 0 0; font-size: 14px; color: #333;">
                                Thank you for your effort and dedication. Keep applying and the right opportunity will come your way 🚀
                            </p>

                            <p style="margin: 10px 0 0; font-size: 14px; color: #333;">
                                Regards,<br>
                                <strong>Nipe Mchongo Team</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #fafafa; padding: 20px; font-size: 12px; color: #777;">
                            <p style="margin: 0;">You’re receiving this email because you applied for gigs on Nipe Mchongo.</p>
                            <p style="margin: 5px 0;">Need help? Contact us at
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
