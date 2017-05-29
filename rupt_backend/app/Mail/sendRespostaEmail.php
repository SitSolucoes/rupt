<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class sendRespostaEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $assunto;
    public $resposta;

    public function __construct($assunto, $resposta)
    {
        $this->assunto = $assunto;
        $this->resposta = $resposta;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.sendRespostaEmail')
                    ->with($this->resposta)
                    ->subject('Resposta ao contato: '.$this->assunto);
    }
}
