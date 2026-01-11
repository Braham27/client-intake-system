import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FileText,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

async function getStats() {
  const [
    totalIntakes,
    pendingIntakes,
    completedIntakes,
    totalConsultations,
    upcomingConsultations,
    recentIntakes,
    recentConsultations,
  ] = await Promise.all([
    prisma.intakeForm.count(),
    prisma.intakeForm.count({ where: { status: "pending" } }),
    prisma.intakeForm.count({ where: { status: "completed" } }),
    prisma.consultation.count(),
    prisma.consultation.count({
      where: {
        scheduledDate: { gte: new Date() },
        status: "scheduled",
      },
    }),
    prisma.intakeForm.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { client: true },
    }),
    prisma.consultation.findMany({
      take: 5,
      orderBy: { scheduledDate: "asc" },
      where: {
        scheduledDate: { gte: new Date() },
        status: "scheduled",
      },
      include: { client: true },
    }),
  ]);

  return {
    totalIntakes,
    pendingIntakes,
    completedIntakes,
    totalConsultations,
    upcomingConsultations,
    recentIntakes,
    recentConsultations,
  };
}

export default async function AdminDashboard() {
  // In production, add proper authentication check here
  // For now, we'll assume admin access
  
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link href="/admin" className="text-xl font-bold gradient-text">
              WebCraft Admin
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/admin/intakes" className="text-sm hover:text-primary transition-colors">
                Intakes
              </Link>
              <Link href="/admin/consultations" className="text-sm hover:text-primary transition-colors">
                Consultations
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                View Site
              </Link>
              <form action="/api/admin/logout" method="POST">
                <Button type="submit" variant="outline" size="sm">
                  Logout
                </Button>
              </form>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Intakes
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalIntakes}</div>
              <p className="text-xs text-muted-foreground">
                {stats.pendingIntakes} pending review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Consultations
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalConsultations}</div>
              <p className="text-xs text-muted-foreground">
                {stats.upcomingConsultations} upcoming
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedIntakes}</div>
              <p className="text-xs text-muted-foreground">
                Projects closed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Conversion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalIntakes > 0
                  ? Math.round((stats.completedIntakes / stats.totalIntakes) * 100)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Intakes to projects
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Intakes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Intakes</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/intakes">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {stats.recentIntakes.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4 text-center">
                  No intake forms yet
                </p>
              ) : (
                <div className="space-y-4">
                  {stats.recentIntakes.map((intake) => (
                    <div
                      key={intake.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {intake.client?.firstName} {intake.client?.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {intake.businessName || intake.client?.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            intake.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : intake.status === "in_progress"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          }`}
                        >
                          {intake.status.replace("_", " ")}
                        </span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/intakes/${intake.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Consultations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Consultations</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/consultations">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {stats.recentConsultations.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4 text-center">
                  No upcoming consultations
                </p>
              ) : (
                <div className="space-y-4">
                  {stats.recentConsultations.map((consultation) => (
                    <div
                      key={consultation.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {consultation.client?.firstName} {consultation.client?.lastName}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(consultation.scheduledDate).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            at {new Date(consultation.scheduledDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/consultations/${consultation.id}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/admin/intakes?status=pending">
                <AlertCircle className="mr-2 h-4 w-4" />
                Review Pending Intakes ({stats.pendingIntakes})
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/intake">
                <FileText className="mr-2 h-4 w-4" />
                Test Intake Form
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/schedule">
                <Calendar className="mr-2 h-4 w-4" />
                Test Scheduling
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
