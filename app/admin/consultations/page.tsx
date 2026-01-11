import Link from "next/link";
import { Calendar, Search, ArrowLeft, Clock, CheckCircle, XCircle, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: Promise<{ status?: string; date?: string; page?: string }>;
}

async function getConsultations(status?: string, date?: string, page = 1) {
  const perPage = 20;
  const skip = (page - 1) * perPage;

  const where: Record<string, unknown> = {};
  
  if (status && status !== "all") {
    where.status = status;
  }
  
  if (date) {
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setDate(endOfDay.getDate() + 1);
    where.scheduledDate = {
      gte: startOfDay,
      lt: endOfDay,
    };
  }

  const [consultations, total] = await Promise.all([
    prisma.consultation.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { scheduledDate: "asc" },
      include: { 
        client: true,
      },
    }),
    prisma.consultation.count({ where }),
  ]);

  return { consultations, total, pages: Math.ceil(total / perPage) };
}

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  no_show: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

const statusIcons = {
  scheduled: Clock,
  completed: CheckCircle,
  cancelled: XCircle,
  no_show: XCircle,
};

export default async function ConsultationsListPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const { consultations, total, pages } = await getConsultations(params.status, params.date, currentPage);

  // Separate upcoming and past
  const now = new Date();
  const upcoming = consultations.filter((c) => new Date(c.scheduledDate) >= now && c.status === "scheduled");
  const others = consultations.filter((c) => new Date(c.scheduledDate) < now || c.status !== "scheduled");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-bold">Consultations</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/admin/intakes" className="text-sm hover:text-primary transition-colors">
                Intakes
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
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Input
                  name="date"
                  type="date"
                  defaultValue={params.date}
                  className="w-full"
                />
              </div>
              <select
                name="status"
                defaultValue={params.status || "all"}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no_show">No Show</option>
              </select>
              <Button type="submit">
                Filter
              </Button>
              {(params.date || params.status) && (
                <Button variant="ghost" asChild>
                  <Link href="/admin/consultations">Clear</Link>
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground">
            Showing {consultations.length} of {total} consultations
          </p>
        </div>

        {/* Consultations List */}
        {consultations.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No consultations found</h3>
              <p className="text-muted-foreground">
                {params.date || params.status
                  ? "Try adjusting your filters"
                  : "Consultations will appear here when clients book them"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Upcoming */}
            {upcoming.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Upcoming ({upcoming.length})
                </h2>
                <div className="space-y-4">
                  {upcoming.map((consultation) => {
                    const StatusIcon = statusIcons[consultation.status as keyof typeof statusIcons] || Clock;
                    
                    return (
                      <Card key={consultation.id} className="hover:shadow-md transition-shadow border-l-4 border-l-primary">
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Video className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold">
                                  {consultation.client?.firstName} {consultation.client?.lastName}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {consultation.client?.email}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-medium">
                                  {new Date(consultation.scheduledDate).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                                  <Clock className="h-3 w-3" />
                                  {new Date(consultation.scheduledDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                                </p>
                              </div>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/consultations/${consultation.id}`}>
                                  Details
                                </Link>
                              </Button>
                            </div>
                          </div>

                          {consultation.notes && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-sm text-muted-foreground">{consultation.notes}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Past/Other */}
            {others.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  {upcoming.length > 0 ? "Past & Other" : "Consultations"} ({others.length})
                </h2>
                <div className="space-y-4">
                  {others.map((consultation) => {
                    const StatusIcon = statusIcons[consultation.status as keyof typeof statusIcons] || Clock;
                    
                    return (
                      <Card key={consultation.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-muted-foreground" />
                              </div>
                              <div>
                                <h3 className="font-semibold">
                                  {consultation.client?.firstName} {consultation.client?.lastName}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {consultation.client?.email}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm">
                                  {new Date(consultation.scheduledDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${
                                    statusColors[consultation.status as keyof typeof statusColors]
                                  }`}
                                >
                                  <StatusIcon className="h-3 w-3" />
                                  {consultation.status.replace("_", " ")}
                                </span>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/consultations/${consultation.id}`}>
                                  View
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/admin/consultations?page=${page}${params.status ? `&status=${params.status}` : ""}${params.date ? `&date=${params.date}` : ""}`}
                className={`px-4 py-2 rounded-md ${
                  page === currentPage
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {page}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
