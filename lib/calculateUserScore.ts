import { getInterviewsByUserId } from "./actions/general.action";
import { getFeedbackByInterviewId } from "./actions/general.action"; // adjust path as needed

interface CategoryAverages {
  [categoryName: string]: number;
}

interface UserScoreSummary {
  overallScore: number;
  categoryAverages: CategoryAverages;
}

export async function calculateUserScoreSummary(
  userId: string
): Promise<UserScoreSummary> {
  const interviews = await getInterviewsByUserId(userId);
  if (!interviews || interviews.length === 0)
    return { overallScore: 0, categoryAverages: {} };

  let totalScoreSum = 0;
  let totalScoreCount = 0;

  const categoryTotals: { [key: string]: { sum: number; count: number } } = {};

  for (const interview of interviews) {
    const feedback = await getFeedbackByInterviewId({
      interviewId: interview.id,
      userId,
    });

    if (!feedback || typeof feedback.totalScore !== "number") continue;

    totalScoreSum += feedback.totalScore;
    totalScoreCount += 1;

    if (Array.isArray(feedback.categoryScores)) {
      for (const category of feedback.categoryScores) {
        if (!category.name || typeof category.score !== "number") continue;

        if (!categoryTotals[category.name]) {
          categoryTotals[category.name] = { sum: 0, count: 0 };
        }

        categoryTotals[category.name].sum += category.score;
        categoryTotals[category.name].count += 1;
      }
    }
  }

  const overallScore =
    totalScoreCount > 0 ? totalScoreSum / totalScoreCount : 0;

  const categoryAverages: CategoryAverages = {};
  for (const [name, data] of Object.entries(categoryTotals)) {
    categoryAverages[name] = data.sum / data.count;
  }

  return { overallScore: Math.round(overallScore), categoryAverages };
}
