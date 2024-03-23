import { Oswald } from 'next/font/google'
export const oswald = Oswald({
    subsets: ["cyrillic", 'cyrillic-ext', "latin", "latin-ext", "vietnamese"],
    weight: ["200", "300", "400", "500", "600", "700"]
})