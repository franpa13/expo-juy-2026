"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StrataDivider } from "@/components/layout/strata";
import { contactSchema, CONTACT_TOPICS, type ContactFormValues } from "../lib/schema";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", topic: "visitante", message: "" },
  });

  function onSubmit(values: ContactFormValues) {
    // Prototype: no backend. In production this would POST to an API route.
    console.log("Contact form submitted", values);
    setSubmitted(true);
    form.reset();
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-line bg-card p-6 text-sm text-card-foreground shadow-sm sm:p-8"
        role="status"
      >
        <StrataDivider className="mb-4 h-1 max-w-16" />
        <p>
          ¡Gracias! Recibimos tu mensaje. El equipo organizador se va a poner en
          contacto a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-line bg-card p-6 shadow-sm sm:p-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="tu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo de contacto</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Elegí un motivo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CONTACT_TOPICS.map((topic) => (
                    <SelectItem key={topic.value} value={topic.value}>
                      {topic.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="Contanos en qué podemos ayudarte" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar mensaje</Button>
      </form>
    </Form>
  );
}
