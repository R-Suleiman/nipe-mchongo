<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>New Gig from Nipe mchongo</title>
</head>

<body style="background-color: #2a2a2a; font-family: Arial, sans-serif; padding: 20px; color: white;">
    <section style="background-color: #333; padding: 16px; border-radius: 8px;">
        <p style="font-size: 18px; font-weight: bold; margin: 10px 0;">Hello <span>{{ $user['firstname'] }},</span></p>
        <p style="font-size: 16px; font-weight: bold;">New Gig has been posted on Nipe Mchongo that we think you might be
            interested in.</p>

        <p style="margin: 10px 0;"><strong>Job Title:</strong> {{ $job['title'] }}</p>
        <p style="margin: 10px 0;"><strong>Job Location:</strong> {{ $job['location'] }}</p>
        <p style="margin: 10px 0;"><strong>Description:</strong><br> {{ $job['description'] }}</p>

        <p style="font-size: 16px; font-weight: bold; margin: 10px 0">Click <a
                href={{ 'http://localhost/get-job/' . $job['id'] }}
                style="color: blue; text-decoration: underline;">here</a> to view full job details</p>

        <p style="margin: 2px 0;"><strong>Regards,</strong></p>
        <p><strong>Nipe Mchongo Team</strong></p>
    </section>
</body>

</html>
