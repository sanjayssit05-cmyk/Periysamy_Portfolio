import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  FiCalendar,
  FiPause,
  FiPlay,
  FiRotateCcw,
  FiUsers,
} from 'react-icons/fi'
import { monthlyPerformance } from '../data/portfolio.js'

const chartTooltip = {
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  color: 'var(--text)',
  fontSize: '12px',
}

const customers = [
  { name: 'New', value: 42, color: '#5968e8' },
  { name: 'Returning', value: 35, color: '#48c8c0' },
  { name: 'Other', value: 23, color: '#f0b879' },
]

function AnalyticsDashboard() {
  const [period, setPeriod] = useState('12 months')
  const [streamData, setStreamData] = useState(monthlyPerformance)
  const [isStreaming, setIsStreaming] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(() => new Date())
  const updateCount = useRef(0)
  const data = useMemo(
    () => (period === '6 months' ? streamData.slice(-6) : streamData),
    [period, streamData],
  )
  const totals = useMemo(() => data.reduce(
    (result, month) => ({
      revenue: result.revenue + month.revenue,
      orders: result.orders + month.orders,
      customers: result.customers + month.customers,
    }),
    { revenue: 0, orders: 0, customers: 0 },
  ), [data])
  const averageOrderValue = totals.orders ? totals.revenue / totals.orders : 0

  useEffect(() => {
    if (!isStreaming) return undefined

    const intervalId = window.setInterval(() => {
      updateCount.current += 1
      const tick = updateCount.current
      const revenueIncrease = 180 + ((tick * 73) % 321)

      setStreamData((currentData) => {
        const nextData = [...currentData]
        const latestMonth = nextData[nextData.length - 1]
        nextData[nextData.length - 1] = {
          ...latestMonth,
          revenue: latestMonth.revenue + revenueIncrease,
          orders: latestMonth.orders + 1 + (tick % 3),
          customers: latestMonth.customers + 1 + (tick % 2),
        }
        return nextData
      })
      setLastUpdated(new Date())
    }, 2500)

    return () => window.clearInterval(intervalId)
  }, [isStreaming])

  function resetStream() {
    updateCount.current = 0
    setStreamData(monthlyPerformance)
    setLastUpdated(new Date())
    setIsStreaming(true)
  }

  return (
    <section className="dashboard-section section-shell" id="dashboard">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">A closer look</span>
          <h2>Numbers tell a story.<br /><span>Let&apos;s make it clear.</span></h2>
          <p>Explore an interactive dashboard with a simulated live data stream. All values are illustrative.</p>
        </div>
        <label className="period-picker">
          <FiCalendar aria-hidden="true" />
          <span className="sr-only">Select dashboard period</span>
          <select value={period} onChange={(event) => setPeriod(event.target.value)}>
            <option>12 months</option>
            <option>6 months</option>
          </select>
        </label>
      </div>

      <div className="dashboard-frame">
        <div className="dashboard-toolbar">
          <div className="dashboard-brand">
            <span className="dashboard-brand-mark">A</span>
            <span>Sales overview <small>Sample dashboard</small></span>
          </div>
          <div className="dashboard-stream-actions">
            <span className="live-indicator"><i className={isStreaming ? 'stream-active' : 'stream-paused'} /> {isStreaming ? 'Live demo · simulated' : 'Stream paused'}</span>
            <button className="stream-control" type="button" onClick={() => setIsStreaming((streaming) => !streaming)} aria-label={isStreaming ? 'Pause simulated live data' : 'Resume simulated live data'}>
              {isStreaming ? <FiPause /> : <FiPlay />}
              <span>{isStreaming ? 'Pause' : 'Resume'}</span>
            </button>
            <button className="stream-control stream-reset" type="button" onClick={resetStream} aria-label="Reset simulated data">
              <FiRotateCcw />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="kpi-grid">
          <article className="kpi-card">
            <span>Total revenue</span>
            <strong>${(totals.revenue / 1000).toFixed(1)}k</strong>
            <small className="kpi-sample">Illustrative sample</small>
          </article>
          <article className="kpi-card">
            <span>Orders</span>
            <strong>{totals.orders.toLocaleString()}</strong>
            <small className="kpi-sample">Illustrative sample</small>
          </article>
          <article className="kpi-card">
            <span>Avg. order value</span>
            <strong>${averageOrderValue.toFixed(2)}</strong>
            <small className="kpi-sample">Calculated from sample data</small>
          </article>
          <article className="kpi-card">
            <span>Customer-months</span>
            <strong>{totals.customers.toLocaleString()}</strong>
            <small className="kpi-sample">Monthly counts summed</small>
          </article>
        </div>

        <div className="dashboard-charts">
          <article className="chart-card chart-revenue">
            <div className="chart-title">
              <div><h3>Revenue over time</h3><span>Monthly revenue · USD</span></div>
              <span className="chart-legend"><i /> Revenue</span>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 6, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5968e8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#5968e8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                  <Tooltip contentStyle={chartTooltip} formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#5968e8" strokeWidth={2.5} fill="url(#revenueGradient)" activeDot={{ r: 5, fill: '#5968e8' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>
          <article className="chart-card chart-orders">
            <div className="chart-title">
              <div><h3>Monthly orders</h3><span>Order volume</span></div>
              <span className="chart-icon"><FiUsers /></span>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 12, right: 0, left: -24, bottom: 0 }}>
                  <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                  <Tooltip contentStyle={chartTooltip} formatter={(value) => [value, 'Orders']} />
                  <Bar dataKey="orders" fill="#48c8c0" radius={[5, 5, 0, 0]} maxBarSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
          <article className="chart-card chart-customer">
            <div className="chart-title">
              <div><h3>Customer mix</h3><span>Audience breakdown</span></div>
            </div>
            <div className="customer-chart-body">
              <div className="customer-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={customers} dataKey="value" nameKey="name" innerRadius="66%" outerRadius="92%" paddingAngle={4} stroke="none">
                      {customers.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={chartTooltip} formatter={(value) => [`${value}%`, 'Customers']} />
                  </PieChart>
                </ResponsiveContainer>
                <span className="customer-chart-total"><strong>{(totals.customers / 1000).toFixed(1)}k</strong><small>customers</small></span>
              </div>
              <div className="customer-legend">
                {customers.map((customer) => (
                  <div key={customer.name}><i style={{ backgroundColor: customer.color }} /><span>{customer.name}</span><strong>{customer.value}%</strong></div>
                ))}
              </div>
            </div>
          </article>
          <article className="chart-note">
            <span className="chart-note-badge">i</span>
            <p><strong>Simulated live feed · updated {lastUpdated.toLocaleTimeString()}</strong><br />Auto-updates every 2.5 seconds while running. Generated sample values only; not connected to a real business data source.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default AnalyticsDashboard
