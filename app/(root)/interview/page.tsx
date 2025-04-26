import Agent from "@/components/Agent";
import { getInterviewsByUserId } from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
export const dynamic = "force-dynamic";

const Page = async () => {
  const user = await getCurrentUser();
  const [userInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id || ""),
  ]);

  // Assuming interviewLimitReached means the user has exhausted their free interviews.
  const interviewLimitReached = (userInterviews ?? []).length >= 5;

  return (
    <>
      {/* Conditionally render the AlertDialog if the interview limit is reached */}
      {interviewLimitReached ? (
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="absolute top-50">
            {" "}
            {/* Adjust the top value to control the vertical position */}
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                  <CardTitle>Interview limit reached</CardTitle>
                </div>
                <CardDescription>
                  You have reached your limit of <strong>5 free</strong>{" "}
                  interviews per account. Subscribe for more interviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You have exhausted your free interviews. Please subscribe to
                  get unlimited interviews.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdFeUGJO-8XB-LgvnS4JqDrYq32MWdSPAJaBhjsn7rG4BmLEw/viewform"
                    target="_blank"
                  >
                    Subscribe to Pro
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        // Render the Agent component if interview limit is not reached
        <Agent userName={user?.name!} userId={user?.id} type="generate" />
      )}
    </>
  );
};

export default Page;
