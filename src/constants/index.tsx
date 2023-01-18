import { grey } from "@mui/material/colors";

export const maxWidth = 480;

export const videoChart = {
  labels: [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ],
  datasets: [
    {
      type: "line" as const,
      label: "Dataset 1",
      data: [
        412, 212, 108, 80, 60, 48, 40, 34, 26, 24, 20, 16, 14, 13, 12, 11, 10.5,
        10, 9.6, 9.3, 9, 8.8, 8.4, 8.2, 8, 7.8, 7.6, 7.4, 7.2, 7, 6.8,
      ],
      pointRadius: 6,
      pointBorderWidth: 6,
      borderWidth: 8,
      backgroundColor: grey[50],
    //   borderColor: "#00d1b0",
      borderColor: "#00e94f",
      curve: 3,
    },
  ],
};

export const chartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        display: false,
        font: {
          size: 14,
          family: "LINESeedKR",
          weight: "700",
        },
        color: grey[700],
      },
      grid: {
        drawBorder: false,
      },
    },
    x: {
      ticks: {
        font: {
          size: 14,
          family: "LINESeedKR",
          weight: "700",
        },
        color: grey[700],
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
  maintainAspectRatio: false,
};

export const videoChartMobile = {
  labels: ["0", "5", "10", "15", "20", "25", "30"],
  datasets: [
    {
      type: "line" as const,
      label: "Dataset 1",
      data: [412, 48, 20, 11, 9, 7.8, 6.8],
      pointRadius: 4,
      pointBorderWidth: 4,
      borderWidth: 6,
      backgroundColor: grey[50],
    //   borderColor: "#00d1b0",
      borderColor: "#00e94f",
      curve: 3,
    },
  ],
};

export const chartOptionsMobile = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        display: false,
        font: {
          size: 12,
          family: "LINESeedKR",
          weight: "700",
        },
        color: grey[700],
      },
      grid: {
        drawBorder: false,
      },
    },
    x: {
      ticks: {
        font: {
          size: 12,
          family: "LINESeedKR",
          weight: "700",
        },
        color: grey[700],
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
  maintainAspectRatio: false,
};

export const revenueChartData = {
  labels: ["1", "2", "3", "4"],
  datasets: [
    {
      // type: "pie" as const,
      label: "Dataset 1",
      data: [725, 80, 63, 132],
      backgroundColor: ["#00e94f", grey[800], grey[600], grey[400]],
      borderWidth: 0,
      spacing: 24,
    },
  ],
};
export const revenueChartOptions = {
  cutout: 60,
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      display: false,
      labels: {
        font: {
          color: grey[700],
          family: "Pretendard",
          weight: "700",
        },
      },
    },
  },
  maintainAspectRatio: false,
};

export const revenueChartOptionsMobile = {
  cutout: 40,
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      display: false,
      labels: {
        font: {
          color: grey[700],
          family: "Pretendard",
          weight: "700",
        },
      },
    },
  },
  maintainAspectRatio: false,
};
