import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { searchFunds, addtoWatchlist } from "./../api/mf.api.js";
import { Spinner } from "@/components/ui/spinner.jsx";
import { toast } from "react-hot-toast";

function Landingpage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // for debouncing searching for 500ms
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      searchMutualFunds();
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const searchMutualFunds = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      const res = await searchFunds(query);
      setResults(res.data?.data || []);
      // console.log(res.data?.data);
    } catch (error) {
      console.log("error in fetching funds:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = async (fund) => {
    try {
      const res = await addtoWatchlist(fund);
      // console.log(res);
      toast.success(`${res?.data?.message}`);
    } catch (error) {
      console.log("error in adding fund to watchlist:", error);
      // console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Failed to add fund");
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center">
          <h1 className=" text-3xl font-bold">
            Discover & Track
            <br />
            Top Mutual Funds
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Search thousands of mutual funds instantly, compare schemes, and
            build your personalized watchlist with real-time insights.
          </p>
        </div>

        <div className="mt-10 w-full max-w-2xl">
          <form
            className="flex items-center gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              clearTimeout(debounceRef.current);
              searchMutualFunds();
            }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <Input
                type="text"
                placeholder="Search mutual funds..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-14 rounded-2xl border-slate-200 bg-white pl-12 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
            <Button type="submit" variant="destructive" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="mt-8 w-full max-w-3xl space-y-4">
            {results.map((fund) => (
              <Card
                key={fund.schemeCode}
                className="rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-md"
              >
                <CardContent className="flex items-center gap-1 justify-between px-2">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {fund.schemeName}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Scheme Code: {fund.schemeCode}
                    </p>
                  </div>

                  <Button
                    onClick={() => handleAddToWatchlist(fund)}
                    className="rounded-xl"
                  >
                    Add to Watchlist
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {loading && (
          <div className="my-8">
            <Spinner className="size-8" />
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <div className="mt-10 text-center text-slate-500">
            No funds found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Landingpage;
