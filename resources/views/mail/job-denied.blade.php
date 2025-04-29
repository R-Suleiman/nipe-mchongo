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

        <p style="margin: 10px 0;">We regret to inform you that your application has been denied by the gig owner.</p>
        <p style="margin: 10px 0;">Keep trying and apply more. There are a lot of opportunities in Nipe Mchongo</p>
        <p style="margin: 10px 0;">Thank you and keep using Nipe Mchongo for more interesting opportunities.</p>

        <p style="margin: 2px 0;"><strong>Regards,</strong></p>
        <p><strong>Nipe Mchongo Team</strong></p>
    </section>
</body>

</html>
