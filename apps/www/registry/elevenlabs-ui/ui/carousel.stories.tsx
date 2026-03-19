import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./carousel";
import { Card, CardContent } from "./card";

const meta: Meta<typeof Carousel> = {
  title: "UI/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A carousel component built with Embla Carousel. Supports horizontal and vertical orientations, keyboard navigation, and composable sub-components for full customization.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm px-14">
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A basic horizontal carousel with numbered slides and navigation arrows.",
      },
    },
  },
};

export const MultipleItems: Story = {
  render: () => (
    <div className="w-full max-w-lg px-14">
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {Array.from({ length: 8 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-4">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Carousel showing multiple items per view using basis-1/3 on each item.",
      },
    },
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="py-14">
      <Carousel orientation="vertical" className="w-full max-w-xs">
        <CarouselContent className="h-64">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Carousel with vertical orientation for scrolling slides up and down.",
      },
    },
  },
};

export const WithImages: Story = {
  render: () => {
    const slides = [
      { bg: "bg-blue-100 dark:bg-blue-950", label: "Ocean Sunrise", emoji: "🌊" },
      { bg: "bg-green-100 dark:bg-green-950", label: "Forest Path", emoji: "🌲" },
      { bg: "bg-amber-100 dark:bg-amber-950", label: "Golden Hour", emoji: "🌅" },
      { bg: "bg-rose-100 dark:bg-rose-950", label: "Mountain Peak", emoji: "🏔️" },
      { bg: "bg-purple-100 dark:bg-purple-950", label: "Night Sky", emoji: "🌙" },
    ];

    return (
      <div className="w-full max-w-sm px-14">
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div
                  className={`flex aspect-video flex-col items-center justify-center gap-3 rounded-xl ${slide.bg}`}
                >
                  <span className="text-5xl">{slide.emoji}</span>
                  <span className="text-sm font-medium text-foreground/70">
                    {slide.label}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel with looping enabled, showing image-like slide cards with labels.",
      },
    },
  },
};

export const WithDots: Story = {
  render: () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const count = 5;

    const handleSetApi = (newApi: CarouselApi) => {
      setApi(newApi);
      if (newApi) {
        setCurrent(newApi.selectedScrollSnap());
        newApi.on("select", () => {
          setCurrent(newApi.selectedScrollSnap());
        });
      }
    };

    return (
      <div className="flex w-full max-w-sm flex-col items-center gap-4 px-14">
        <Carousel setApi={handleSetApi} opts={{ loop: true }}>
          <CarouselContent>
            {Array.from({ length: count }).map((_, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="flex gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === current
                  ? "bg-foreground w-4"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          Slide {current + 1} of {count}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel with dot indicators and a slide counter using the CarouselApi.",
      },
    },
  },
};

