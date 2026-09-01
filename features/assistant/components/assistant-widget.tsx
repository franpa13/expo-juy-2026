"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { answerAssistant } from "../lib/script";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  text: "¡Hola! Soy el asistente de ExpoJuy 2026. Preguntame sobre fechas, expositores, agenda o cómo contactar a la organización.",
};

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", text: question };
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: answerAssistant(question),
    };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {open ? (
        <Card className="w-80 shadow-lg sm:w-96">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <div>
              <CardTitle className="text-base">Asistente ExpoJuy</CardTitle>
              <Badge variant="secondary" className="mt-1">
                Demo — respuestas guionadas, sin IA conectada
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Cerrar asistente"
            >
              <X className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="max-h-64 space-y-2 overflow-y-auto" role="log" aria-live="polite">
              {messages.map((message) => (
                <p
                  key={message.id}
                  className={
                    message.role === "assistant"
                      ? "rounded-lg bg-muted px-3 py-2 text-sm text-foreground"
                      : "ml-8 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                  }
                >
                  {message.text}
                </p>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribí tu pregunta..."
                aria-label="Escribí tu pregunta para el asistente"
              />
              <Button type="submit" size="icon" aria-label="Enviar pregunta">
                <MessageCircle className="size-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Button
          size="icon"
          className="size-12 rounded-full shadow-lg"
          onClick={() => setOpen(true)}
          aria-label="Abrir asistente ExpoJuy"
        >
          <MessageCircle className="size-5" />
        </Button>
      )}
    </div>
  );
}
