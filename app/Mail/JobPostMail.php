<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class JobPostMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The contact instance.
     *
     * @var mixed
     */
    protected $job;
    protected $user;

    /**
     * Create a new message instance.
     */
    public function __construct($job, $user)
    {
        $this->job = $job;
        $this->user = $user;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Gig from Nipe Mchongo',
            replyTo: ['noreply@nipemchongo.com'],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.job-post',
            with: [
                'job' => $this->job,
                'user' => $this->user,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
