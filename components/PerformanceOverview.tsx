import { calculateUserScoreSummary } from "@/lib/calculateUserScore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  userId: string;
  interviewLimitReached: boolean;
  userInterviewsCount: number;
}

export default async function UserPerformanceOverview({
  userId,
  interviewLimitReached,
  userInterviewsCount,
}: Props) {
  const { overallScore, categoryAverages } = await calculateUserScoreSummary(
    userId
  );

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - overallScore / 100);

  if (userInterviewsCount === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground mb-4">
          You haven't taken any interviews yet.
        </p>
        <Button asChild className="btn-primary">
          <Link href="/interview">Take your first interview</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center w-full">
      {/* Score Card */}
      <Card className="flex-1 max-w-md">
        <CardHeader className="pb-2">
          <CardTitle>Overall Performance</CardTitle>
          <CardDescription>Your interview performance score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="relative h-40 w-40">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  className="stroke-muted fill-none"
                  cx="50"
                  cy="50"
                  r={radius}
                  strokeWidth="10"
                />
                <circle
                  className="stroke-primary fill-none"
                  cx="50"
                  cy="50"
                  r={radius}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold">{overallScore}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Based on {userInterviewsCount}{" "}
                {userInterviewsCount > 1 ? "interviews" : "interview"}
              </p>
              {interviewLimitReached ? (
                <Button asChild className="btn-primary">
                  <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdFeUGJO-8XB-LgvnS4JqDrYq32MWdSPAJaBhjsn7rG4BmLEw/viewform"
                    target="_blank"
                  >
                    Subscribe
                  </Link>
                </Button>
              ) : (
                <Button asChild className="btn-primary">
                  <Link href="/interview">Start an Interview</Link>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Breakdown */}
      <Card className="flex-1 max-w-xl">
        <CardHeader className="pb-2">
          <CardTitle>Skills Breakdown</CardTitle>
          <CardDescription>Your performance by skill area</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(categoryAverages).map(([category, score]) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{category}</span>
                <span className="text-sm font-medium">
                  {Math.round(score)}%
                </span>
              </div>
              <Progress value={Math.round(score)} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
