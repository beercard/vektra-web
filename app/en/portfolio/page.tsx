import type { Metadata } from "next"
import TrabajosPageEnClient from "./page-client"

export const metadata: Metadata = {
  title: "Portfolio | Our Work & Success Stories",
  description: "Discover our portfolio of web development, online stores, and mobile apps. Real success stories from companies worldwide.",
  keywords: [
    "web development portfolio",
    "marketing success stories",
    "web design argentina",
    "ecommerce examples",
    "apps portfolio",
    "vektra works"
  ],
}

export default function TrabajosPageEn() {
  return <TrabajosPageEnClient />
}