import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import { fetchBidsData, postNewBid } from "./api/axios";

interface BidData {
  bids: number[];
  totalBids: number;
  winningBids: number;
  lostBids: number;
  ctr: number;
}

const App: React.FC = () => {
  const [chartData, setChartData] = useState<number[]>([]);
  const [totalBids, setTotalBids] = useState<number>(0);
  const [winningBids, setWinningBids] = useState<number>(0);
  const [lostBids, setLostBids] = useState<number>(0);
  const [ctr, setCtr] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newBid, setNewBid] = useState<number>(0); // bid חדש

  // פונקציה לטעינת הנתונים
  const loadDashboardData = async () => {
    try {
      const data: BidData = await fetchBidsData();
      setChartData(data.bids);
      setTotalBids(data.totalBids);
      setWinningBids(data.winningBids);
      setLostBids(data.lostBids);
      setCtr(data.ctr);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // פונקציה לשליחת bid חדש
  const handleAddBid = async () => {
    try {
      setLoading(true);
      await postNewBid(newBid); // שליחת ה-bid החדש
      await loadDashboardData(); // עדכון הדשבורד אחרי שליחה מוצלחת
      setNewBid(0); // איפוס השדה לאחר השליחה
    } catch (err) {
      setError("Failed to post new bid");
    } finally {
      setLoading(false);
    }
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Bids",
        data: chartData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Bidding Trends",
      },
    },
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* כרטיס גרף */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bids Over Time
              </Typography>
              <Line data={data} options={options} />
            </CardContent>
          </Card>
        </Grid>

        {/* כרטיסים סטטיסטיים */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Bids</Typography>
              <Typography variant="h4">{totalBids}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Winning Bids</Typography>
              <Typography variant="h4">{winningBids}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Lost Bids</Typography>
              <Typography variant="h4">{lostBids}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">CTR (%)</Typography>
              <Typography variant="h4">{ctr}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* שדה להוספת bid חדש */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Add New Bid
              </Typography>
              <TextField
                label="New Bid"
                type="number"
                value={newBid}
                onChange={(e) => setNewBid(Number(e.target.value))}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddBid}
                style={{ marginLeft: "10px" }}
              >
                Add Bid
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
