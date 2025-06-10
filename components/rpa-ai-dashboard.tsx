/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createClient } from "@/lib/supabase/client";
import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Bell,
  Settings,
  Moon,
  ShoppingCart,
  Users,
  Eye,
  DollarSign,
  Download,
  FileText,
  MessageCircle,
  Send,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Dashboard = ({
  email,
  weeklyData,
}: // users
{
  email: string;
  weeklyData: any;
  // users: any
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [authTab, setAuthTab] = useState("login");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "bot",
      message: "Hello! I can help you analyze your dashboard data.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [chatHeight, setChatHeight] = useState(200);
  const [isDragging, setIsDragging] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [dashboardData, setDashboardData] = useState<{
    timestamp: string;
    refreshCount: number;
  } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // const weeklyData = [
  //   { day: "Sunday", revenue: 450, sales: 320 },
  //   { day: "Monday", revenue: 500, sales: 250 },
  //   { day: "Tuesday", revenue: 420, sales: 380 },
  //   { day: "Wednesday", revenue: 560, sales: 450 },
  //   { day: "Thursday", revenue: 230, sales: 200 },
  //   { day: "Friday", revenue: 410, sales: 370 },
  //   { day: "Saturday", revenue: 190, sales: 390 },
  // ];

  // Sales
  // id
  // revenue
  // sale
  // createdAt

  const yearlyData = [
    { year: "2019", q1: 26, q2: 15 },
    { year: "2020", q1: 10, q2: 12 },
    { year: "2021", q1: 43, q2: 32 },
    { year: "2022", q1: 52, q2: 39 },
    { year: "2023", q1: 63, q2: 60 },
    { year: "2024", q1: 78, q2: 73 },
    { year: "2025", q1: 93, q2: 86 },
  ];

  const sidebarItems = [
    { id: "dashboard", label: "Dashboards" },
    { id: "charts", label: "Charts" },
    { id: "reports", label: "Report Generation" },
  ];

  const handleMouseDown = (e: { preventDefault: () => void }) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e: { clientY: number }) => {
      if (isDragging) {
        const newHeight = window.innerHeight - e.clientY;
        setChatHeight(Math.max(150, Math.min(400, newHeight)));
      }
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (showSettingsMenu && !event.target.closest(".settings-menu")) {
        setShowSettingsMenu(false);
      }
      if (showNotifications && !event.target.closest(".notifications-menu")) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettingsMenu, showNotifications]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage = { id: Date.now(), type: "user", message: chatInput };
      setChatMessages([...chatMessages, newMessage]);

      setTimeout(() => {
        let aiResponse = "";
        const input = chatInput.toLowerCase();

        if (
          input.includes("revenue") ||
          input.includes("money") ||
          input.includes("income")
        ) {
          aiResponse =
            "Your current revenue is $9,254.62, which shows a strong +18.25% growth since last month. This is your best performing metric right now!";
        } else if (input.includes("users") || input.includes("customers")) {
          aiResponse =
            "You have 63,154 total users with a healthy +8.21% growth rate. User engagement appears strong based on your daily visit metrics.";
        } else if (input.includes("orders") || input.includes("sales")) {
          aiResponse =
            "Current orders are at 753, showing a -5.75% decrease from last month. This might need attention - would you like me to analyze potential causes?";
        } else if (
          input.includes("day") ||
          input.includes("week") ||
          input.includes("performance")
        ) {
          aiResponse =
            "Wednesday was your peak performance day with $560 revenue and 450 sales. Consider analyzing what made Wednesday successful to replicate across other days.";
        } else if (input.includes("report") || input.includes("generate")) {
          aiResponse =
            "I can help you generate a comprehensive report! Go to the Report Generation tab to create a detailed PDF with all your analytics data.";
        } else {
          aiResponse =
            "Based on your dashboard: Revenue is up 18.25% ($9,254.62), you have 8,652 daily visits, but orders are down 5.75%. Focus on conversion optimization. What specific area would you like me to analyze?";
        }

        const newAiMessage = {
          id: Date.now() + 1,
          type: "bot",
          message: aiResponse,
        };
        setChatMessages((prev) => [...prev, newAiMessage]);
      }, 800);

      setChatInput("");
    }
  };

  const generateReport = () => {
    alert(
      "PDF Report Generated Successfully!\\n\\nReport includes:\\n• Revenue Analytics\\n• User Metrics\\n• Sales Performance\\n• Weekly Trends\\n\\nDownload started..."
    );
  };
  const refreshDashboard = async () => {
    setIsRefreshing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newData = {
        timestamp: new Date().toISOString(),
        refreshCount: dashboardData ? dashboardData.refreshCount + 1 : 1,
      };
      setDashboardData(newData);
    } catch (error) {
      console.error("Error refreshing dashboard:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLoginSubmit = (e: any) => {
    e.preventDefault();
    alert("Login functionality would connect to authentication system");
  };

  const handleRegisterSubmit = (e: any) => {
    e.preventDefault();
    alert("Registration functionality would create new account");
  };

  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors`}
    >
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 bg-slate-800 text-white overflow-hidden`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-300 mb-6">Main</h2>

          {sidebarItems.map((item) => (
            <div key={item.id} className="mb-2">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id ? "bg-blue-600" : "hover:bg-slate-700"
                }`}
              >
                <span className="text-sm">{item.label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`flex-1 flex flex-col ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        } transition-colors`}
      >
        <header
          className={`${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border-b px-6 py-4 transition-colors`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                {isSidebarOpen ? (
                  <X size={20} stroke={isDarkMode ? "white" : "black"} />
                ) : (
                  <Menu size={20} stroke={isDarkMode ? "white" : "black"} />
                )}
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative notifications-menu">
                <div className="relative notifications-menu">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <Bell
                      size={20}
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-2 w-2 flex items-center justify-center"></span>
                  </button>

                  {showNotifications && (
                    <div
                      className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg z-50 ${
                        isDarkMode
                          ? "bg-gray-800 border border-gray-700"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3
                            className={`text-lg font-semibold ${
                              isDarkMode ? "text-white" : "text-gray-800"
                            }`}
                          >
                            Notifications
                          </h3>
                          <button
                            onClick={() => setShowNotifications(false)}
                            className={`text-sm ${
                              isDarkMode ? "text-blue-400" : "text-blue-600"
                            } hover:underline`}
                          ></button>
                        </div>

                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {/* Notification 3 */}
                          <div
                            className={`p-3 rounded-lg ${
                              isDarkMode ? "bg-gray-700" : "bg-gray-50"
                            } cursor-pointer hover:${
                              isDarkMode ? "bg-gray-600" : "bg-gray-100"
                            } transition-colors`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-medium ${
                                    isDarkMode ? "text-white" : "text-gray-800"
                                  }`}
                                >
                                  Low conversion rate alert
                                </p>
                                <p
                                  className={`text-xs ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  } mt-1`}
                                >
                                  Conversion rate dropped to 3.27%. Consider
                                  reviewing your strategy.
                                </p>
                                <p
                                  className={`text-xs ${
                                    isDarkMode
                                      ? "text-gray-500"
                                      : "text-gray-500"
                                  } mt-1`}
                                >
                                  3 hours ago
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Notification 5 - Read */}
                          <div
                            className={`p-3 rounded-lg ${
                              isDarkMode ? "bg-gray-800" : "bg-white"
                            } cursor-pointer hover:${
                              isDarkMode ? "bg-gray-700" : "bg-gray-50"
                            } transition-colors border ${
                              isDarkMode ? "border-gray-600" : "border-gray-200"
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm ${
                                    isDarkMode
                                      ? "text-gray-300"
                                      : "text-gray-600"
                                  }`}
                                >
                                  New user registration spike
                                </p>
                                <p
                                  className={`text-xs ${
                                    isDarkMode
                                      ? "text-gray-500"
                                      : "text-gray-500"
                                  } mt-1`}
                                >
                                  50+ new users registered in the last 24 hours.
                                </p>
                                <p
                                  className={`text-xs ${
                                    isDarkMode
                                      ? "text-gray-500"
                                      : "text-gray-500"
                                  } mt-1`}
                                >
                                  2 days ago
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <button
                            className={`w-full text-center text-sm ${
                              isDarkMode ? "text-blue-400" : "text-blue-600"
                            } hover:underline`}
                          >
                            View all notifications
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative settings-menu">
                <button
                  onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <Settings
                    size={20}
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  />
                </button>

                {showSettingsMenu && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
                      isDarkMode
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActiveTab("auth");
                          setAuthTab("login");
                          setShowSettingsMenu(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Authentication
                      </button>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={() => {
                          setActiveTab("auth");
                          setAuthTab("login");
                          setShowSettingsMenu(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("auth");
                          setAuthTab("register");
                          setShowSettingsMenu(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Register
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("auth");
                          setAuthTab("forgot");
                          setShowSettingsMenu(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Forgot Password
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("auth");
                          setAuthTab("lock");
                          setShowSettingsMenu(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Lock Screen
                      </button>
                      <button
                        onClick={logout}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setIsDarkMode(!isDarkMode);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-yellow-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <Moon size={20} />
              </button>
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {email}
              </span>
            </div>
          </div>
        </header>

        <main
          className={`flex-1 p-6 overflow-auto transition-colors ${
            isDarkMode ? "text-white" : ""
          }`}
        >
          {activeTab === "dashboard" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1
                    className={`text-2xl font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Welcome!
                  </h1>
                  {dashboardData && (
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      } mt-1`}
                    >
                      Last refreshed:{" "}
                      {new Date(dashboardData.timestamp).toLocaleTimeString()}
                      {isRefreshing && (
                        <span className="ml-2 text-blue-500">
                          Refreshing...
                        </span>
                      )}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Dashboards {">"} Welcome!
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div
                  className={`rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-transform ${
                    isDarkMode
                      ? "bg-gradient-to-r from-cyan-400 to-cyan-500"
                      : "bg-gradient-to-r from-pink-400 to-pink-500"
                  }`}
                  title="Daily Visits: 10,265 (+5.97% since last month)"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">DAILY VISITS</p>
                      <p className="text-3xl font-bold">10,265</p>
                      <p className="text-sm mt-1">+5.97% Since last month</p>
                    </div>
                    <Eye size={32} className="opacity-80" />
                  </div>
                </div>

                <div
                  className={`rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-transform ${
                    isDarkMode
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                      : "bg-gradient-to-r from-purple-500 to-purple-600"
                  }`}
                  title="Revenue: $13,254.62 (+18.25% since last month)"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">REVENUE</p>
                      <p className="text-3xl font-bold">$13,254.62</p>
                      <p className="text-sm mt-1">+18.25% Since last month</p>
                    </div>
                    <DollarSign size={32} className="opacity-80" />
                  </div>
                </div>

                <div
                  className={`rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-transform ${
                    isDarkMode
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                      : "bg-gradient-to-r from-blue-400 to-blue-500"
                  }`}
                  title="Orders: 1242 (-3.75% since last month)"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">ORDERS</p>
                      <p className="text-3xl font-bold">1242</p>
                      <p className="text-sm mt-1">-3.75% Since last month</p>
                    </div>
                    <ShoppingCart size={32} className="opacity-80" />
                  </div>
                </div>

                <div
                  className={`rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-transform ${
                    isDarkMode
                      ? "bg-gradient-to-r from-orange-400 to-orange-500"
                      : "bg-gradient-to-r from-teal-400 to-teal-500"
                  }`}
                  title="Users: 124,302 (+10.21% since last month)"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">USERS</p>
                      <p className="text-3xl font-bold">124,302</p>
                      <p className="text-sm mt-1">+10.21% Since last month</p>
                    </div>
                    <Users size={32} className="opacity-80" />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2
                  className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  TalentCore HR Solutions
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div
                  className={`rounded-xl p-6 shadow-sm ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className={`text-lg font-semibold ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Weekly Sales Report
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={refreshDashboard}
                        disabled={isRefreshing}
                        className={`p-2 rounded transition-colors focus:outline-none ${
                          isDarkMode
                            ? "bg-gray-600 text-gray-300 hover:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500"
                        } ${
                          isRefreshing ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        title="Refresh dashboard"
                      >
                        {isRefreshing ? "⟳" : "↻"}
                      </button>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Bar
                        dataKey="revenue"
                        fill={isDarkMode ? "#06B6D4" : "#14B8A6"}
                      />
                      <Bar
                        dataKey="sales"
                        fill={isDarkMode ? "#64748B" : "#1F2937"}
                      />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Current Week
                      </p>
                      <p
                        className={`text-xl font-bold ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        $1402.43
                      </p>
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Previous Week
                      </p>
                      <p
                        className={`text-xl font-bold ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        $1306.74
                      </p>
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Conversion
                      </p>
                      <p
                        className={`text-xl font-bold ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        3.43%
                      </p>
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Customers
                      </p>
                      <p
                        className={`text-xl font-bold ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        4k
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-xl p-6 shadow-sm ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className={`text-lg font-semibold ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Yearly Sales Report
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={refreshDashboard}
                        disabled={isRefreshing}
                        className={`p-2 rounded transition-colors focus:outline-none ${
                          isDarkMode
                            ? "bg-gray-600 text-gray-300 hover:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500"
                        } ${
                          isRefreshing ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        title="Refresh dashboard"
                      >
                        {isRefreshing ? "⟳" : "↻"}
                      </button>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Line
                        type="monotone"
                        dataKey="q1"
                        stroke={isDarkMode ? "#06B6D4" : "#14B8A6"}
                        strokeWidth={3}
                      />
                      <Line
                        type="monotone"
                        dataKey="q2"
                        stroke={isDarkMode ? "#64748B" : "#1F2937"}
                        strokeWidth={3}
                      />
                      <Line
                        type="monotone"
                        dataKey="q3"
                        stroke={isDarkMode ? "#64748B" : "#1F2937"}
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                    <div className="flex space-x-8">
                      <div>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Quarter 1
                        </p>
                        <p
                          className={`text-xl font-bold ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          $63.8k
                        </p>
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Quarter 2
                        </p>
                        <p
                          className={`text-xl font-bold ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          $78.4k
                        </p>
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Quarter 3
                        </p>
                        <p
                          className={`text-xl font-bold ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          $93.2k
                        </p>
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          All Time
                        </p>
                        <p
                          className={`text-xl font-bold ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          $235.4k
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-2xl font-bold ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        66.25%
                      </p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        US DOLLAR SHARE
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded ${
                      isDarkMode ? "bg-cyan-400" : "bg-teal-500"
                    }`}
                  ></div>
                  <span className={isDarkMode ? "text-white" : "text-black"}>
                    Revenue
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded ${
                      isDarkMode ? "bg-slate-500" : "bg-gray-800"
                    }`}
                  ></div>
                  <span className={isDarkMode ? "text-white" : "text-black"}>
                    Sales
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "auth" && authTab === "login" && (
            <div className="flex items-center justify-center min-h-full">
              <div className="w-full max-w-md">
                <div
                  className={`rounded-xl p-8 shadow-lg ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="mb-6">
                    <h1
                      className={`text-2xl font-semibold mb-2 ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Sign In
                    </h1>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Enter your email address and password to access account.
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, email: e.target.value })
                        }
                        className={`w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 transition-colors ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "border-gray-300"
                        }`}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label
                          className={`text-sm font-medium ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setAuthTab("forgot")}
                          className="text-sm text-blue-500 hover:underline"
                        >
                          Forgot your password?
                        </button>
                      </div>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                        className={`w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 transition-colors ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "border-gray-300"
                        }`}
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={loginForm.remember}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            remember: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor="remember"
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Remember me
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-400 to-teal-400 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-500 hover:to-teal-500 transition-all flex items-center justify-center"
                    >
                      <span className="mr-2">●</span>
                      Log In
                    </button>
                  </form>

                  <div className="mt-6">
                    <p
                      className={`text-center text-sm mb-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Sign in with
                    </p>
                    <div className="flex justify-center space-x-3">
                      <button className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                        <span className="text-blue-500 font-bold">f</span>
                      </button>
                      <button className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                        <span className="text-red-500 font-bold">G</span>
                      </button>
                      <button className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                        <span className="text-blue-500 font-bold">t</span>
                      </button>
                      <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <span className="text-gray-700 font-bold">G</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Don&apos;t have an account?
                      <button
                        onClick={() => setAuthTab("register")}
                        className="text-blue-500 hover:underline ml-1 font-medium"
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "auth" && authTab === "register" && (
            <div className="flex items-center justify-center min-h-full">
              <div className="w-full max-w-md">
                <div
                  className={`rounded-xl p-8 shadow-lg ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="mb-6">
                    <h1
                      className={`text-2xl font-semibold mb-2 ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Sign Up
                    </h1>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Create your account to get started.
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={registerForm.email}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            email: e.target.value,
                          })
                        }
                        className={`w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 transition-colors ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "border-gray-300"
                        }`}
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Create password"
                        value={registerForm.password}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            password: e.target.value,
                          })
                        }
                        className={`w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 transition-colors ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "border-gray-300"
                        }`}
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm your password"
                        value={registerForm.confirmPassword}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        className={`w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 transition-colors ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "border-gray-300"
                        }`}
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={registerForm.terms}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            terms: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor="terms"
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        I agree to the Terms of Service and Privacy Policy
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-400 to-teal-400 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-500 hover:to-teal-500 transition-all flex items-center justify-center"
                    >
                      <span className="mr-2">●</span>
                      Create Account
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Already have an account?
                      <button
                        onClick={() => setAuthTab("login")}
                        className="text-blue-500 hover:underline ml-1 font-medium"
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "auth" && authTab === "forgot" && (
            <div className="flex items-center justify-center min-h-full">
              <div className="w-full max-w-md">
                <div
                  className={`rounded-xl p-8 shadow-lg text-center ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <h1
                    className={`text-2xl font-semibold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Forgot Password
                  </h1>
                  <p
                    className={`mb-6 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Enter your email to reset password
                  </p>

                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 transition-colors ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "border-gray-300"
                      }`}
                    />
                    <button className="w-full bg-gradient-to-r from-blue-400 to-teal-400 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-500 hover:to-teal-500 transition-all">
                      Reset Password
                    </button>
                  </div>

                  <div className="mt-6 text-center">
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Remember your password?
                      <button
                        onClick={() => setAuthTab("login")}
                        className="text-blue-500 hover:underline ml-1 font-medium"
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "auth" && authTab === "lock" && (
            <div className="flex items-center justify-center min-h-full">
              <div className="w-full max-w-md">
                <div
                  className={`rounded-xl p-8 shadow-lg text-center ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <h1
                    className={`text-2xl font-semibold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Lock Screen
                  </h1>
                  <p
                    className={`mb-6 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Enter password to unlock screen
                  </p>

                  <div className="space-y-4">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className={`w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 transition-colors ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "border-gray-300"
                      }`}
                    />
                    <button className="w-full bg-gradient-to-r from-blue-400 to-teal-400 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-500 hover:to-teal-500 transition-all">
                      Unlock
                    </button>
                  </div>

                  <div className="mt-6 text-center">
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Not you?
                      <button
                        onClick={() => setAuthTab("login")}
                        className="text-blue-500 hover:underline ml-1 font-medium"
                      >
                        Switch account
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "auth" && authTab === "logout" && (
            <div className="flex items-center justify-center min-h-full">
              <div className="w-full max-w-md">
                <div
                  className={`rounded-xl p-8 shadow-lg text-center ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <h1
                    className={`text-2xl font-semibold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Logout
                  </h1>
                  <p
                    className={`mb-6 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Are you sure you want to logout?
                  </p>

                  <div className="space-y-3">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                      Yes, Logout
                    </button>
                    <button
                      onClick={() => setActiveTab("dashboard")}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="mt-6 text-center">
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Need to switch accounts?
                      <button
                        onClick={() => setAuthTab("login")}
                        className="text-blue-500 hover:underline ml-1 font-medium"
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="flex items-center justify-center min-h-full">
              <div className="w-full max-w-md">
                <div
                  className={`rounded-xl p-8 shadow-lg transition-colors ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="mb-6 text-center">
                    <FileText
                      size={48}
                      className="mx-auto text-blue-500 mb-4"
                    />
                    <h1
                      className={`text-2xl font-semibold mb-2 transition-colors ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Report Generation
                    </h1>
                    <p
                      className={`text-sm transition-colors ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Create a comprehensive PDF report based on your dashboard
                      data.
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 transition-colors ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Report Type
                      </label>
                      <select
                        className={`w-full border rounded-lg pl-4 pr-10 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors appearance-none ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                            : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                        } cursor-pointer`}
                      >
                        <option
                          className={isDarkMode ? "bg-gray-700" : "bg-white"}
                        >
                          Complete Analytics Report
                        </option>
                        <option
                          className={isDarkMode ? "bg-gray-700" : "bg-white"}
                        >
                          Revenue Only
                        </option>
                        <option
                          className={isDarkMode ? "bg-gray-700" : "bg-white"}
                        >
                          User Metrics Only
                        </option>
                        <option
                          className={isDarkMode ? "bg-gray-700" : "bg-white"}
                        >
                          Weekly Performance
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Date Range
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="date"
                          placeholder="Start date"
                          className={`border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 transition-colors ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-700"
                          }`}
                        />
                        <input
                          type="date"
                          placeholder="End date"
                          className={`border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 transition-colors ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-700"
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 transition-colors ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Include Sections
                      </label>
                      <div className="space-y-2">
                        {[
                          "Revenue Analytics",
                          "User Demographics",
                          "Sales Performance",
                          "Weekly Trends",
                          "Conversion Metrics",
                        ].map((section) => (
                          <label key={section} className="flex items-center">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="mr-3 text-blue-500 rounded focus:ring-blue-500"
                            />
                            <span
                              className={`text-sm transition-colors ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {section}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={generateReport}
                      className="w-full bg-gradient-to-r from-blue-400 to-teal-400 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-500 hover:to-teal-500 transition-all flex items-center justify-center space-x-2"
                    >
                      <Download size={20} />
                      <span>Generate PDF Report</span>
                    </button>
                  </form>

                  <div className="mt-6">
                    <p
                      className={`text-center text-sm mb-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    ></p>
                    <div className=""></div>
                  </div>

                  <div className="mt-6 text-center">
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {activeTab === "dashboard" && (
          <div>
            <div
              className={`h-1 cursor-ns-resize border-t transition-colors ${
                isDarkMode
                  ? "border-gray-700 bg-gray-700 hover:bg-gray-600"
                  : "border-gray-200 bg-gray-200 hover:bg-gray-300"
              }`}
              onMouseDown={handleMouseDown}
            />
            <div
              className={`transition-colors ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800"
                  : "border-gray-200 bg-white"
              }`}
              style={{ height: isChatCollapsed ? "60px" : `${chatHeight}px` }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <MessageCircle size={20} className="text-blue-500" />
                    <h3
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      AI Data Assistant
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsChatCollapsed(!isChatCollapsed)}
                      className={`p-1 rounded transition-colors ${
                        isDarkMode
                          ? "hover:bg-gray-700 text-gray-300"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                      title={isChatCollapsed ? "Expand chat" : "Collapse chat"}
                    >
                      {isChatCollapsed ? "□" : "−"}
                    </button>
                  </div>
                </div>

                {!isChatCollapsed && (
                  <>
                    <div
                      className={`rounded-lg p-4 overflow-y-auto mb-4 transition-colors ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                      style={{ height: `${chatHeight - 140}px` }}
                    >
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`mb-3 ${
                            msg.type === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          <div
                            className={`inline-block px-4 py-2 rounded-lg text-sm max-w-xs ${
                              msg.type === "user"
                                ? "bg-blue-500 text-white"
                                : isDarkMode
                                ? "bg-gray-600 text-white border border-gray-500"
                                : "bg-white text-black border border-gray-200"
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        placeholder="Ask about your dashboard data..."
                        className={`flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          isDarkMode
                            ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border border-gray-300 text-black placeholder-gray-500"
                        }
                        }`}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
