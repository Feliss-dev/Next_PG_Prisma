"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Header } from "./header";
import { BackButton } from "./back-button";

interface CardWrapperProps{
    children: React.ReactNode;
    headerLabel: string;
   
};

export const CardWrapper = ({
    children,
    headerLabel,
 
}: CardWrapperProps) => {
    return(
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
           
            <CardFooter>
              Back
            </CardFooter>
        </Card>
    )
}