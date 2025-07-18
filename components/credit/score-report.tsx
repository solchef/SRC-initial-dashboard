"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, TrendingDown, CheckCircle, Download, RefreshCw, Calendar, Target } from "lucide-react"

export function ScoreReportInterface() {
  const scoreData = {
    currentScore: 785,
    previousScore: 762,
    scoreChange: 23,
    rating: "Excellent",
    percentile: 92,
    lastUpdated: "2024-01-18",
    nextUpdate: "2024-02-18",
    scoreHistory: [
      { month: "Jul 2023", score: 720 },
      { month: "Aug 2023", score: 735 },
      { month: "Sep 2023", score: 742 },
      { month: "Oct 2023", score: 738 },
      { month: "Nov 2023", score: 755 },
      { month: "Dec 2023", score: 762 },
      { month: "Jan 2024", score: 785 },
    ],
    scoreFactors: [
      {
        factor: "Payment History",
        weight: 35,
        score: 95,
        impact: "positive",
        description: "Excellent payment track record with 98.5% on-time payments",
      },
      {
        factor: "Credit Utilization",
        weight: 30,
        score: 85,
        impact: "positive",
        description: "Good utilization at 30% of available credit limit",
      },
      {
        factor: "Trade History Length",
        weight: 15,
        score: 78,
        impact: "neutral",
        description: "3.5 years of trade finance history",
      },
      {
        factor: "Trade Diversification",
        weight: 10,
        score: 82,
        impact: "positive",
        description: "Well-diversified across regions and commodities",
      },
      {
        factor: "Recent Credit Inquiries",
        weight: 10,
        score: 68,
        impact: "negative",
        description: "3 hard inquiries in the last 6 months",
      },
    ],
    recommendations: [
      {
        title: "Reduce Credit Utilization",
        description: "Lower your utilization below 25% to improve your score",
        impact: "+15-25 points",
        priority: "high",
      },
      {
        title: "Diversify Trade Partners",
        description: "Expand your counterparty network to reduce concentration risk",
        impact: "+5-10 points",
        priority: "medium",
      },
      {
        title: "Maintain Payment History",
        description: "Continue your excellent payment performance",
        impact: "Maintain current score",
        priority: "high",
      },
    ],
  }

  const getScoreRating = (score: number) => {
    if (score >= 750) return { rating: "Excellent", color: "text-green-600", bgColor: "bg-green-100 border-green-200" }
    if (score >= 700) return { rating: "Good", color: "text-blue-600", bgColor: "bg-blue-100 border-blue-200" }
    if (score >= 650) return { rating: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-100 border-yellow-200" }
    return { rating: "Poor", color: "text-red-600", bgColor: "bg-red-100 border-red-200" }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "negative":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High Priority</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Priority</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low Priority</Badge>
      default:
        return <Badge variant="outline">Normal</Badge>
    }
  }

  const ratingInfo = getScoreRating(scoreData.currentScore)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Credit Score Report</h1>
          <p className="text-muted-foreground">Detailed analysis of your credit score and factors</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Score
          </Button>
        </div>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">{scoreData.currentScore}</CardTitle>
            <CardDescription>
              <Badge className={ratingInfo.bgColor + " text-lg px-3 py-1"}>{ratingInfo.rating}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {scoreData.scoreChange > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={scoreData.scoreChange > 0 ? "text-green-600" : "text-red-600"}>
                {scoreData.scoreChange > 0 ? "+" : ""}
                {scoreData.scoreChange} points
              </span>
            </div>
            <p className="text-sm text-muted-foreground">From previous score of {scoreData.previousScore}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Percentile Rank</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scoreData.percentile}th</div>
            <p className="text-xs text-muted-foreground">Better than {scoreData.percentile}% of borrowers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Update</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{scoreData.nextUpdate}</div>
            <p className="text-xs text-muted-foreground">Monthly updates</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="factors" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="factors">Score Factors</TabsTrigger>
          <TabsTrigger value="history">Score History</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="factors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Score Factor Breakdown
              </CardTitle>
              <CardDescription>How different factors contribute to your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {scoreData.scoreFactors.map((factor, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{factor.factor}</span>
                        {getImpactIcon(factor.impact)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{factor.weight}% weight</span>
                        <span className="font-bold">{factor.score}/100</span>
                      </div>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Score History
              </CardTitle>
              <CardDescription>Your credit score trend over the past 7 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreData.scoreHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{entry.month}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{entry.score}</span>
                      {index > 0 && (
                        <span
                          className={`text-sm ${
                            entry.score > scoreData.scoreHistory[index - 1].score
                              ? "text-green-600"
                              : entry.score < scoreData.scoreHistory[index - 1].score
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {entry.score > scoreData.scoreHistory[index - 1].score && "+"}
                          {entry.score - scoreData.scoreHistory[index - 1].score}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Score Improvement Recommendations
              </CardTitle>
              <CardDescription>Actions you can take to improve your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreData.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{rec.title}</h4>
                      {getPriorityBadge(rec.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">Potential Impact: {rec.impact}</span>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry Comparison</CardTitle>
                <CardDescription>How your score compares to industry averages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Your Score</span>
                  <span className="font-bold text-primary">{scoreData.currentScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Industry Average</span>
                  <span className="font-bold">720</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Top 10% Threshold</span>
                  <span className="font-bold">780</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Your Percentile</span>
                  <span className="font-bold text-green-600">{scoreData.percentile}th</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Score Ranges</CardTitle>
                <CardDescription>Understanding credit score categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Excellent (750-850)</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <Progress value={100} className="h-2 bg-green-100" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Good (700-749)</span>
                    <div className="w-4 h-4"></div>
                  </div>
                  <Progress value={0} className="h-2 bg-blue-100" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Fair (650-699)</span>
                    <div className="w-4 h-4"></div>
                  </div>
                  <Progress value={0} className="h-2 bg-yellow-100" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Poor (300-649)</span>
                    <div className="w-4 h-4"></div>
                  </div>
                  <Progress value={0} className="h-2 bg-red-100" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
