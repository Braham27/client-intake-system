import Link from "next/link";
import { FileText, Search, Filter, ArrowLeft, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}

async function getIntakes(status?: string, search?: string, page = 1) {
  const perPage = 20;
  const skip = (page - 1) * perPage;

  const where: Record<string, unknown> = {};
  
  if (status && status !== "all") {
    where.status = status;
  }
  
  if (search) {
    where.OR = [
      { businessName: { contains: search, mode: "insensitive" } },
      { client: { firstName: { contains: search, mode: "insensitive" } } },
      { client: { lastName: { contains: search, mode: "insensitive" } } },
      { client: { email: { contains: search, mode: "insensitive" } } },
    ];
  }

  const [intakes, total] = await Promise.all([
    prisma.intakeForm.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { createdAt: "desc" },
      include: { client: true },
    }),
    prisma.intakeForm.count({ where }),
  ]);

  return { intakes, total, pages: Math.ceil(total / perPage) };
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const statusIcons = {
  pending: AlertCircle,
  in_progress: Clock,
  completed: CheckCircle,
  cancelled: XCircle,
};

export default async function IntakesListPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const { intakes, total, pages } = await getIntakes(params.status, params.search, currentPage);

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
              <h1 className="text-xl font-bold">Intake Forms</h1>
            </div>
            <nav className="flex items-center gap-4">
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
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="search"
                    placeholder="Search by name, email, or business..."
                    defaultValue={params.search}
                    className="pl-9"
                  />
                </div>
              </div>
              <select
                name="status"
                defaultValue={params.status || "all"}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <Button type="submit">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground">
            Showing {intakes.length} of {total} intakes
          </p>
        </div>

        {/* Intakes List */}
        {intakes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No intake forms found</h3>
              <p className="text-muted-foreground">
                {params.search || params.status
                  ? "Try adjusting your filters"
                  : "Intake forms will appear here when clients submit them"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {intakes.map((intake) => {
              const StatusIcon = statusIcons[intake.status as keyof typeof statusIcons] || AlertCircle;
              
              return (
                <Card key={intake.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {intake.client?.firstName} {intake.client?.lastName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {intake.businessName || "No business name"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {intake.client?.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                              statusColors[intake.status as keyof typeof statusColors]
                            }`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {intake.status.replace("_", " ")}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(intake.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/intakes/${intake.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="mt-4 pt-4 border-t flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      {intake.websiteType && (
                        <span>Type: {intake.websiteType}</span>
                      )}
                      {intake.budget && (
                        <span>Budget: {intake.budget}</span>
                      )}
                      {intake.timeline && (
                        <span>Timeline: {intake.timeline}</span>
                      )}
                      {intake.wantsConsultation && (
                        <span className="text-primary">📅 Wants consultation</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/admin/intakes?page=${page}${params.status ? `&status=${params.status}` : ""}${params.search ? `&search=${params.search}` : ""}`}
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
