import { X, Download, TrendingUp, AlertTriangle, DollarSign, Users, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { useRef } from "react";
import rockiesDugoutStoreLogo from "figma:asset/1717564bc045af2e8f8bd35047159ec02ff7f332.png";
import jibeRetailLogo from "figma:asset/c9ceb1471dccd073ec86737828ad56cc026ab66e.png";
import worldMap from "figma:asset/63ce3284c798e57a28c3e1a993ddad3ef10f97ba.png";

type DateRange = {
  from: Date;
  to: Date;
};

type ExecutiveReportProps = {
  dateRange: DateRange;
  onClose: () => void;
  isModal?: boolean;
};

const generateReportData = (dateRange: DateRange) => {
  const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const totalSurveys = Math.floor(days * 45);
  const completedSurveys = totalSurveys - 57;
  const abandonedSurveys = 57;
  
  const interactedWithAssociate = Math.floor(totalSurveys * 0.78);
  const satisfiedWithAssociate = Math.floor(interactedWithAssociate * 0.89);
  
  // Base location data with percentages
  const BASE_LOCATIONS = [
    { region: "Colorado", city: "Denver", baseCount: 892, basePercentage: 66.2, coordinates: { x: 24.5, y: 42.5 } },
    { region: "Colorado", city: "Aurora", baseCount: 187, basePercentage: 13.9, coordinates: { x: 25, y: 42.5 } },
    { region: "Colorado", city: "Lakewood", baseCount: 94, basePercentage: 7.0, coordinates: { x: 24, y: 42.5 } },
    { region: "Colorado", city: "Boulder", baseCount: 52, basePercentage: 3.9, coordinates: { x: 24.2, y: 41.8 } },
    { region: "Colorado", city: "Arvada", baseCount: 38, basePercentage: 2.8, coordinates: { x: 24.2, y: 42.2 } },
    { region: "Colorado", city: "Westminster", baseCount: 29, basePercentage: 2.2, coordinates: { x: 24.4, y: 42.1 } },
    { region: "Colorado", city: "Centennial", baseCount: 21, basePercentage: 1.6, coordinates: { x: 24.7, y: 43 } },
    { region: "Colorado", city: "Colorado Springs", baseCount: 18, basePercentage: 1.3, coordinates: { x: 24.7, y: 44 } },
    { region: "Colorado", city: "Fort Collins", baseCount: 15, basePercentage: 1.1, coordinates: { x: 24.4, y: 40.8 } },
  ];

  // Scale location counts based on totalSurveys
  const baseTotalVisitors = BASE_LOCATIONS.reduce((sum, loc) => sum + loc.baseCount, 0);
  const customerLocations = BASE_LOCATIONS.map(location => {
    const scaledCount = Math.round((location.baseCount / baseTotalVisitors) * totalSurveys);
    return {
      region: location.region,
      city: location.city,
      count: scaledCount,
      percentage: location.basePercentage,
      coordinates: location.coordinates
    };
  });
  
  return {
    totalSurveys,
    completedSurveys,
    abandonedSurveys,
    interactedWithAssociate,
    satisfiedWithAssociate,
    customerFeedback: {
      couldNotFindMerchandise: Math.floor(totalSurveys * 0.33),
      checkoutProcessDifficult: Math.floor(totalSurveys * 0.09),
      waitTimeTooLong: Math.floor(totalSurveys * 0.18),
      didNotReceiveAssistance: Math.floor(totalSurveys * 0.12),
      associateUnfriendly: Math.floor(totalSurveys * 0.08),
    },
    outOfStock: {
      totalReported: 242,
      totalRevenueLoss: 28250.00,
      topItems: [
        { item: "Rockies Home Replica Jersey", size: "L", reports: 17, unitPrice: 250.00, loss: 4250.00 },
        { item: "Rockies City Connect Jersey", size: "XL", reports: 19, unitPrice: 200.00, loss: 3800.00 },
        { item: "Rockies Purple Alternate Jersey", size: "M", reports: 18, unitPrice: 200.00, loss: 3600.00 },
        { item: "Rockies Dugout Jacket", size: "XL", reports: 12, unitPrice: 275.00, loss: 3300.00 },
        { item: "Rockies Heritage Jersey", size: "L", reports: 14, unitPrice: 220.00, loss: 3080.00 },
      ]
    },
    abandonedSurveyBreakdown: [
      { screen: "Welcome Screen", count: 8, avgTime: "0:12" },
      { screen: "Initial Questions", count: 12, avgTime: "0:38" },
      { screen: "Merchandise Category", count: 5, avgTime: "0:45" },
      { screen: "Merchandise Search", count: 15, avgTime: "1:22" },
      { screen: "Associate Rating", count: 9, avgTime: "1:05" },
      { screen: "Email Submission", count: 8, avgTime: "1:48" },
    ],
    customerLocations,
    referralSources: [
      { name: "Source 1", description: "Coors Field Walk-ins", count: 412, percentage: 30.6 },
      { name: "Source 2", description: "Rockies Social Media", count: 356, percentage: 26.4 },
      { name: "Source 3", description: "RTD Transit Ads", count: 198, percentage: 14.7 },
      { name: "Source 4", description: "LoDo Digital Billboards", count: 167, percentage: 12.4 },
      { name: "Source 5", description: "Rockies Email", count: 89, percentage: 6.6 },
      { name: "Source 6", description: "Denver Union Station", count: 67, percentage: 5.0 },
      { name: "Source 7", description: "Denver Airport Ads", count: 45, percentage: 3.3 },
      { name: "Source 8", description: "Rockies Radio", count: 34, percentage: 2.5 },
      { name: "Source 9", description: "Ballpark District Hotels", count: 28, percentage: 2.1 },
      { name: "Source 10", description: "Visit Denver Guide", count: 22, percentage: 1.6 },
      { name: "Source 11", description: "A Line Promotions", count: 18, percentage: 1.3 },
      { name: "Source 12", description: "Rideshare Promotions", count: 15, percentage: 1.1 },
      { name: "Source 13", description: "Rockies Broadcasts", count: 12, percentage: 0.9 },
      { name: "Source 14", description: "Other", count: 24, percentage: 1.8 },
    ]
  };
};

export function ExecutiveReport({ dateRange, onClose, isModal }: ExecutiveReportProps) {
  const data = generateReportData(dateRange);
  const reportRef = useRef<HTMLDivElement>(null);
  
  const associateEngagementRate = ((data.interactedWithAssociate / data.totalSurveys) * 100);
  const associateSatisfactionRate = ((data.satisfiedWithAssociate / data.interactedWithAssociate) * 100);
  const completionRate = ((data.completedSurveys / data.totalSurveys) * 100);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: reportRef.current.scrollWidth,
        windowHeight: reportRef.current.scrollHeight
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        unit: 'mm',
        format: [imgWidth, imgHeight],
        orientation: 'portrait'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

      pdf.save(`Colorado_Rockies_Executive_Report_${format(dateRange.from, "yyyy-MM-dd")}_to_${format(dateRange.to, "yyyy-MM-dd")}.pdf`);
    } catch (error) {
      console.error('PDF Error:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleEmail = () => {
    const subject = `Colorado Rockies Dugout Store - Executive Report (${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d, yyyy")})`;
    const body = `Please find the Executive Report for the period ${format(dateRange.from, "MMMM d, yyyy")} to ${format(dateRange.to, "MMMM d, yyyy")}.`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (isModal === false) {
    return (
      <div className="w-full">
        <button onClick={handleDownloadPDF} data-report-download style={{ display: 'none' }} />
        <button onClick={handleEmail} data-report-email style={{ display: 'none' }} />
        
        <div className="px-6 py-6">
          <div ref={reportRef} style={{
            backgroundColor: '#ffffff',
            padding: '48px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#1f2937',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <img src={rockiesDugoutStoreLogo} alt="Rockies Dugout Store" style={{ height: '112px' }} />
                <img src={jibeRetailLogo} alt="Jibe Retail" style={{ height: '90px' }} />
              </div>
              <div style={{ 
                borderLeft: '6px solid #041E42',
                paddingLeft: '24px',
                marginBottom: '24px'
              }}>
                <h1 style={{ 
                  fontSize: '42px', 
                  fontWeight: '900', 
                  color: '#041E42', 
                  margin: '0 0 8px 0',
                  letterSpacing: '-0.5px'
                }}>
                  Executive Report
                </h1>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#6b7280', margin: 0 }}>
                  Colorado Rockies Dugout Store Customer Survey Analysis
                </p>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '16px 24px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Report Period
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: '900', color: '#041E42', margin: 0 }}>
                    {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Generated
                  </p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#475569', margin: 0 }}>
                    {format(new Date(), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
            </div>

            {/* Survey Findings */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #041E42 0%, #0a2f5f 100%)',
                padding: '20px 24px',
                borderRadius: '12px 12px 0 0',
                marginBottom: '0'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '900', 
                  color: '#ffffff', 
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  📊 Survey Findings
                </h2>
              </div>
              <div style={{
                border: '2px solid #e2e8f0',
                borderTop: 'none',
                borderRadius: '0 0 12px 12px',
                padding: '32px',
                background: '#ffffff'
              }}>
                {/* Overview */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Overview
                  </h3>
                  <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#475569', margin: 0 }}>
                    The survey data reveals strong customer engagement with a {completionRate.toFixed(1)}% completion rate. 
                    However, {((data.customerFeedback.couldNotFindMerchandise / data.totalSurveys) * 100).toFixed(1)}% of customers 
                    reported being unable to find desired merchandise, presenting a significant revenue recovery opportunity.
                  </p>
                </div>

                {/* Critical Findings */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Critical Findings
                  </h3>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '12px',
                      padding: '16px',
                      background: '#fef2f2',
                      borderLeft: '4px solid #BF0D3E',
                      borderRadius: '6px'
                    }}>
                      <span style={{ fontSize: '20px', flexShrink: 0 }}>⚠️</span>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#475569', margin: 0 }}>
                        <strong style={{ color: '#1e293b' }}>Out-of-Stock Crisis:</strong> {data.outOfStock.totalReported} items reported unavailable, 
                        resulting in ${data.outOfStock.totalRevenueLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })} in lost revenue
                      </p>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '12px',
                      padding: '16px',
                      background: '#fef2f2',
                      borderLeft: '4px solid #BF0D3E',
                      borderRadius: '6px'
                    }}>
                      <span style={{ fontSize: '20px', flexShrink: 0 }}>🛒</span>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#475569', margin: 0 }}>
                        <strong style={{ color: '#1e293b' }}>Customer Service Gaps:</strong> {data.customerFeedback.didNotReceiveAssistance} customers 
                        ({((data.customerFeedback.didNotReceiveAssistance / data.totalSurveys) * 100).toFixed(1)}%) needed assistance but didn't receive it
                      </p>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '12px',
                      padding: '16px',
                      background: '#fff7ed',
                      borderLeft: '4px solid #f97316',
                      borderRadius: '6px'
                    }}>
                      <span style={{ fontSize: '20px', flexShrink: 0 }}>⏱️</span>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#475569', margin: 0 }}>
                        <strong style={{ color: '#1e293b' }}>Wait Time Issues:</strong> {data.customerFeedback.waitTimeTooLong} customers 
                        ({((data.customerFeedback.waitTimeTooLong / data.totalSurveys) * 100).toFixed(1)}%) reported excessive wait times
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommended Actions */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Recommended Actions
                  </h3>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '12px',
                      padding: '14px',
                      background: '#f0fdf4',
                      borderRadius: '6px'
                    }}>
                      <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                      <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#475569', margin: 0 }}>
                        <strong style={{ color: '#15803d' }}>Inventory Priority:</strong> Immediately restock the top five missing Rockies items, led by replica jerseys, City Connect jerseys, and Rockies caps
                      </p>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '12px',
                      padding: '14px',
                      background: '#f0fdf4',
                      borderRadius: '6px'
                    }}>
                      <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                      <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#475569', margin: 0 }}>
                        <strong style={{ color: '#15803d' }}>Staffing Optimization:</strong> Increase floor coverage during peak hours to reduce wait times and improve assistance availability
                      </p>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '12px',
                      padding: '14px',
                      background: '#f0fdf4',
                      borderRadius: '6px'
                    }}>
                      <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                      <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#475569', margin: 0 }}>
                        <strong style={{ color: '#15803d' }}>Process Improvement:</strong> Streamline checkout process to address the {data.customerFeedback.checkoutProcessDifficult} customer complaints
                      </p>
                    </div>
                  </div>
                </div>

                {/* Revenue Recovery Potential */}
                <div style={{
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  border: '2px solid #10b981',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '13px', fontWeight: '800', color: '#059669', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Estimated Revenue Recovery Potential
                  </p>
                  <p style={{ fontSize: '48px', fontWeight: '900', color: '#047857', margin: '0', lineHeight: '1' }}>
                    ${data.outOfStock.totalRevenueLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p style={{ fontSize: '13px', color: '#059669', margin: '8px 0 0 0', fontWeight: '600' }}>
                    Available through inventory optimization and restocking
                  </p>
                </div>
              </div>
            </div>

            {/* Survey Overview */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #041E42 0%, #0a2f5f 100%)',
                padding: '20px 24px',
                borderRadius: '12px 12px 0 0'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '900', 
                  color: '#ffffff', 
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  📈 Survey Overview
                </h2>
              </div>
              <div style={{
                border: '2px solid #e2e8f0',
                borderTop: 'none',
                borderRadius: '0 0 12px 12px',
                padding: '32px',
                background: '#ffffff'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    padding: '28px',
                    borderRadius: '12px',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.9)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Total Surveys
                    </p>
                    <p style={{ fontSize: '56px', fontWeight: '900', color: '#ffffff', margin: '0', lineHeight: '1' }}>
                      {data.totalSurveys}
                    </p>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    padding: '28px',
                    borderRadius: '12px',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.9)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Completed Surveys
                    </p>
                    <p style={{ fontSize: '56px', fontWeight: '900', color: '#ffffff', margin: '0 0 8px 0', lineHeight: '1' }}>
                      {data.completedSurveys}
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                      {completionRate.toFixed(1)}% completion rate
                    </p>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    padding: '28px',
                    borderRadius: '12px',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.9)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Abandoned Surveys
                    </p>
                    <p style={{ fontSize: '56px', fontWeight: '900', color: '#ffffff', margin: '0 0 8px 0', lineHeight: '1' }}>
                      {data.abandonedSurveys}
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                      {((data.abandonedSurveys / data.totalSurveys) * 100).toFixed(1)}% abandonment rate
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Associate Engagement */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #041E42 0%, #0a2f5f 100%)',
                padding: '20px 24px',
                borderRadius: '12px 12px 0 0'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '900', 
                  color: '#ffffff', 
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  👥 Associate Engagement
                </h2>
              </div>
              <div style={{
                border: '2px solid #e2e8f0',
                borderTop: 'none',
                borderRadius: '0 0 12px 12px',
                padding: '32px',
                background: '#ffffff'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '28px',
                    background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)'
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: '800', color: '#64748b', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Customer Engagement Rate
                    </p>
                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ fontSize: '52px', fontWeight: '900', color: '#041E42', margin: '0', lineHeight: '1' }}>
                        {associateEngagementRate.toFixed(1)}%
                      </p>
                      <p style={{ fontSize: '14px', color: '#64748b', margin: '8px 0 0 0', fontWeight: '600' }}>
                        {data.interactedWithAssociate} of {data.totalSurveys} customers engaged with an associate
                      </p>
                    </div>
                    <div style={{ height: '12px', backgroundColor: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${associateEngagementRate}%`,
                        background: 'linear-gradient(to right, #041E42, #0a2f5f)',
                        borderRadius: '6px'
                      }} />
                    </div>
                  </div>

                  <div style={{
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '28px',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)'
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: '800', color: '#64748b', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Associate Satisfaction Rate
                    </p>
                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ fontSize: '52px', fontWeight: '900', color: '#10b981', margin: '0', lineHeight: '1' }}>
                        {associateSatisfactionRate.toFixed(1)}%
                      </p>
                      <p style={{ fontSize: '14px', color: '#64748b', margin: '8px 0 0 0', fontWeight: '600' }}>
                        {data.satisfiedWithAssociate} of {data.interactedWithAssociate} satisfied with service
                      </p>
                    </div>
                    <div style={{ height: '12px', backgroundColor: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${associateSatisfactionRate}%`,
                        background: 'linear-gradient(to right, #10b981, #059669)',
                        borderRadius: '6px'
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Feedback Breakdown */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #041E42 0%, #0a2f5f 100%)',
                padding: '20px 24px',
                borderRadius: '12px 12px 0 0'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '900', 
                  color: '#ffffff', 
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  💬 Customer Feedback Breakdown
                </h2>
              </div>
              <div style={{
                border: '2px solid #e2e8f0',
                borderTop: 'none',
                borderRadius: '0 0 12px 12px',
                padding: '32px',
                background: '#ffffff'
              }}>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {[
                    { label: 'Could not find the merchandise they wanted', count: data.customerFeedback.couldNotFindMerchandise, color: '#BF0D3E' },
                    { label: 'Checkout process was difficult', count: data.customerFeedback.checkoutProcessDifficult, color: '#dc2626' },
                    { label: 'Wait time was too long', count: data.customerFeedback.waitTimeTooLong, color: '#ea580c' },
                    { label: 'Did not receive needed assistance', count: data.customerFeedback.didNotReceiveAssistance, color: '#f59e0b' },
                    { label: 'Associate was unfriendly', count: data.customerFeedback.associateUnfriendly, color: '#facc15' },
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px 24px',
                      border: '2px solid #f1f5f9',
                      borderRadius: '10px',
                      background: '#fafafa',
                      transition: 'all 0.2s'
                    }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px 0' }}>
                          {item.label}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ flex: 1, maxWidth: '400px' }}>
                            <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                              <div style={{
                                height: '100%',
                                width: `${(item.count / data.totalSurveys) * 100}%`,
                                backgroundColor: item.color,
                                borderRadius: '5px'
                              }} />
                            </div>
                          </div>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', margin: 0, minWidth: '80px' }}>
                            {((item.count / data.totalSurveys) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div style={{ 
                        minWidth: '80px', 
                        textAlign: 'right',
                        paddingLeft: '24px'
                      }}>
                        <p style={{ fontSize: '32px', fontWeight: '900', color: item.color, margin: '0', lineHeight: '1' }}>
                          {item.count}
                        </p>
                        <p style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', margin: '4px 0 0 0', textTransform: 'uppercase' }}>
                          Reports
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Out of Stock */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #BF0D3E 0%, #d4002a 100%)',
                padding: '20px 24px',
                borderRadius: '12px 12px 0 0'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '900', 
                  color: '#ffffff', 
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  📦 Out of Stock Analysis
                </h2>
              </div>
              <div style={{
                border: '2px solid #e2e8f0',
                borderTop: 'none',
                borderRadius: '0 0 12px 12px',
                padding: '32px',
                background: '#ffffff'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
                    border: '2px solid #fecaca',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: '800', color: '#991b1b', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Total Out of Stock Items Reported
                    </p>
                    <p style={{ fontSize: '52px', fontWeight: '900', color: '#BF0D3E', margin: '0', lineHeight: '1' }}>
                      {data.outOfStock.totalReported}
                    </p>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
                    border: '2px solid #fecaca',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: '800', color: '#991b1b', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Total Revenue Loss
                    </p>
                    <p style={{ fontSize: '52px', fontWeight: '900', color: '#BF0D3E', margin: '0', lineHeight: '1' }}>
                      ${data.outOfStock.totalRevenueLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Top 5 Reported Missing Items
                </h3>
                <div style={{ border: '2px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'linear-gradient(to right, #1e293b, #334155)' }}>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Item</th>
                        <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Size</th>
                        <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Reports</th>
                        <th style={{ padding: '16px 20px', textAlign: 'right', fontSize: '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Unit Price</th>
                        <th style={{ padding: '16px 20px', textAlign: 'right', fontSize: '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Revenue Loss</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.outOfStock.topItems.map((item, idx) => (
                        <tr key={idx} style={{ 
                          backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                          borderBottom: idx === data.outOfStock.topItems.length - 1 ? 'none' : '1px solid #e2e8f0'
                        }}>
                          <td style={{ padding: '18px 20px', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{item.item}</td>
                          <td style={{ padding: '18px 20px', fontSize: '14px', fontWeight: '600', color: '#475569', textAlign: 'center' }}>{item.size}</td>
                          <td style={{ padding: '18px 20px', fontSize: '16px', fontWeight: '900', color: '#BF0D3E', textAlign: 'center' }}>{item.reports}</td>
                          <td style={{ padding: '18px 20px', fontSize: '14px', fontWeight: '700', color: '#475569', textAlign: 'right' }}>${item.unitPrice.toFixed(2)}</td>
                          <td style={{ padding: '18px 20px', fontSize: '16px', fontWeight: '900', color: '#BF0D3E', textAlign: 'right' }}>${item.loss.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Abandoned Surveys */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                padding: '20px 24px',
                borderRadius: '12px 12px 0 0'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '900', 
                  color: '#ffffff', 
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  ⚡ Abandoned Surveys
                </h2>
              </div>
              <div style={{
                border: '2px solid #e2e8f0',
                borderTop: 'none',
                borderRadius: '0 0 12px 12px',
                padding: '32px',
                background: '#ffffff'
              }}>
                <div style={{ border: '2px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'linear-gradient(to right, #1e293b, #334155)' }}>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Screen</th>
                        <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Abandonment Count</th>
                        <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '12px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg Time on Screen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.abandonedSurveyBreakdown.map((item, idx) => (
                        <tr key={idx} style={{ 
                          backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                          borderBottom: idx === data.abandonedSurveyBreakdown.length - 1 ? 'none' : '1px solid #e2e8f0'
                        }}>
                          <td style={{ padding: '18px 20px', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{item.screen}</td>
                          <td style={{ padding: '18px 20px', fontSize: '16px', fontWeight: '900', color: '#f97316', textAlign: 'center' }}>{item.count}</td>
                          <td style={{ padding: '18px 20px', fontSize: '14px', fontWeight: '600', color: '#475569', textAlign: 'center' }}>{item.avgTime}</td>
                        </tr>
                      ))}
                      <tr style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }}>
                        <td style={{ padding: '16px 20px', fontSize: '15px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Total Abandoned</td>
                        <td style={{ padding: '16px 20px', fontSize: '18px', fontWeight: '900', color: '#ffffff', textAlign: 'center' }}>
                          {data.abandonedSurveyBreakdown.reduce((sum, item) => sum + item.count, 0)}
                        </td>
                        <td style={{ padding: '16px 20px' }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Customer Locations */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                padding: '20px 24px',
                borderRadius: '12px 12px 0 0'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '900', 
                  color: '#ffffff', 
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  🌍 Customer Locations
                </h2>
              </div>
              <div style={{
                border: '2px solid #e2e8f0',
                borderTop: 'none',
                borderRadius: '0 0 12px 12px',
                padding: '32px',
                background: '#ffffff'
              }}>
                {/* World Map Visualization */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Global Customer Distribution
                  </h3>
                  <div style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '2px solid #e2e8f0',
                    background: '#ffffff',
                    padding: '40px'
                  }}>
                    {/* World Map Image */}
                    <div style={{ position: 'relative', width: '100%' }}>
                      <img 
                        src={worldMap} 
                        alt="World Map"
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block'
                        }}
                      />
                    </div>
                    
                    {/* Legend */}
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '16px', 
                      right: '16px',
                      background: 'rgba(255,255,255,0.95)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#BF0D3E' }}></div>
                        <span style={{ fontSize: '11px', fontWeight: '600', color: '#475569' }}>Customer Locations</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Data Breakdown */}
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Top Customer Origins
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  {data.customerLocations.map((location, idx) => (
                    <div key={idx} style={{
                      background: idx === 0 ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' : '#f8fafc',
                      border: idx === 0 ? '2px solid #3b82f6' : '2px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '16px',
                    }}>
                      <div style={{ marginBottom: '8px' }}>
                        <p style={{ fontSize: '13px', fontWeight: '800', color: '#64748b', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          #{idx + 1}
                        </p>
                        <p style={{ fontSize: '14px', fontWeight: '900', color: '#1e293b', margin: '0 0 2px 0' }}>
                          {location.city}
                        </p>
                        <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', margin: 0 }}>
                          {location.region}
                        </p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '12px' }}>
                        <p style={{ fontSize: '24px', fontWeight: '900', color: idx === 0 ? '#3b82f6' : '#6366f1', margin: 0, lineHeight: '1' }}>
                          {location.count}
                        </p>
                        <p style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', margin: 0 }}>
                          {location.percentage}%
                        </p>
                      </div>
                      <div style={{ marginTop: '8px', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${location.percentage}%`,
                          background: idx === 0 ? 'linear-gradient(to right, #3b82f6, #2563eb)' : 'linear-gradient(to right, #6366f1, #4f46e5)',
                          borderRadius: '3px'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* How Customers Heard About Us */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                padding: '20px 24px',
                borderRadius: '12px 12px 0 0'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '900', 
                  color: '#ffffff', 
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  📢 How Customers Heard About Us
                </h2>
              </div>
              <div style={{
                border: '2px solid #e2e8f0',
                borderTop: 'none',
                borderRadius: '0 0 12px 12px',
                padding: '32px',
                background: '#ffffff'
              }}>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {data.referralSources.map((source, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px 24px',
                      border: '2px solid #f1f5f9',
                      borderRadius: '10px',
                      background: idx < 3 ? 'linear-gradient(135deg, #faf5ff 0%, #ffffff 100%)' : '#fafafa'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: '8px' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                            color: '#ffffff',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '900',
                            letterSpacing: '0.5px',
                            marginRight: '10px'
                          }}>
                            {source.name}
                          </span>
                          <span style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
                            {source.description}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ flex: 1, maxWidth: '400px' }}>
                            <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                              <div style={{
                                height: '100%',
                                width: `${source.percentage}%`,
                                background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
                                borderRadius: '5px'
                              }} />
                            </div>
                          </div>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', margin: 0, minWidth: '60px' }}>
                            {source.percentage.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div style={{ 
                        minWidth: '90px', 
                        textAlign: 'right',
                        paddingLeft: '24px'
                      }}>
                        <p style={{ fontSize: '32px', fontWeight: '900', color: '#8b5cf6', margin: '0', lineHeight: '1' }}>
                          {source.count}
                        </p>
                        <p style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', margin: '4px 0 0 0', textTransform: 'uppercase' }}>
                          Customers
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Stats */}
                <div style={{ 
                  marginTop: '32px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                    border: '2px solid #c4b5fd',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: '800', color: '#6b21a8', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Top Referral Source
                    </p>
                    <p style={{ fontSize: '18px', fontWeight: '900', color: '#7c3aed', margin: 0 }}>
                      {data.referralSources[0].description}
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#8b5cf6', margin: '4px 0 0 0' }}>
                      {data.referralSources[0].count} customers ({data.referralSources[0].percentage}%)
                    </p>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                    border: '2px solid #c4b5fd',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: '800', color: '#6b21a8', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Total Sources Tracked
                    </p>
                    <p style={{ fontSize: '32px', fontWeight: '900', color: '#7c3aed', margin: 0, lineHeight: '1' }}>
                      {data.referralSources.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ 
              marginTop: '48px',
              paddingTop: '24px',
              borderTop: '2px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                This report is confidential and intended for internal use only. © {new Date().getFullYear()} Colorado Rockies Dugout Store
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modal mode (used for quick preview/download)
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        maxWidth: '1400px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '2px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b', margin: 0 }}>
            Executive Report
          </h2>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={handleDownloadPDF}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: '#041E42',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              <Download size={16} />
              Download PDF
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={24} color="#64748b" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '24px'
        }}>
          {/* Render the same content as page mode */}
          <div ref={reportRef} style={{
            backgroundColor: '#ffffff',
            padding: '48px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#1f2937',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Same content as page mode - copy from above */}
          </div>
        </div>
      </div>
    </div>
  );
}
