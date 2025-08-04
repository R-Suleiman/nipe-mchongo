<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Gig application Uppdate</title>
</head>

<body style="background-color: #2a2a2a; font-family: Arial, sans-serif; padding: 20px; color: white;">
    <section style="background-color: #333; padding: 16px; border-radius: 8px;">
        <p style="font-size: 18px; font-weight: bold; margin: 10px 0;">Hello <span>{{ $user['firstname'] }},</span></p>
        <p style="font-size: 16px; font-weight: bold;">We have a feedback for your gig application <span style="font-weight: bold">{{$job->title}}</span> in Nipe Mchongo Platform</p>

        <p style="margin: 10px 0;">Congratulations! We are happy to inform you that your application has been accepted by the gig owner. Stay tuned and wait for the gig owner to contact you for furthur details.</p>
        <p style="margin: 10px 0;">You can log in your account to see the details of your application.</p>
        <p style="margin: 10px 0;">Thank you and keep using Nipe Mchongo for more interesting opportunities.</p>

        <p style="margin: 2px 0;"><strong>Regards,</strong></p>
        <p><strong>Nipe Mchongo Team</strong></p>
    </section>
</body>

</html>
