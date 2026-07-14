import { X, Download, Mail } from "lucide-react";
import { format } from "date-fns";
import { useRef } from "react";
import rockiesDugoutStoreLogo from "figma:asset/1717564bc045af2e8f8bd35047159ec02ff7f332.png";
import jibeRetailLogo from "figma:asset/c9ceb1471dccd073ec86737828ad56cc026ab66e.png";

type DateRange = {
  from: Date;
  to: Date;
};

type OutOfStockReportProps = {
  dateRange: DateRange;
  onClose: () => void;
  isModal?: boolean;
};

type OutOfStockItem = {
  collection: string;
  item: string;
  size: string;
  gender: string;
  quantity: number;
  unitPrice: number;
  revenueLoss: number;
};

const generateOutOfStockData = (dateRange: DateRange) => {
  const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Apparel Items
  const apparelItems: OutOfStockItem[] = [
    { collection: "Home", item: "Rockies Home Replica Jersey", size: "L", gender: "Men's", quantity: 17, unitPrice: 250.00, revenueLoss: 4250.00 },
    { collection: "Home", item: "Rockies Authentic Home Jersey", size: "XL", gender: "Men's", quantity: 12, unitPrice: 250.00, revenueLoss: 3000.00 },
    { collection: "Road", item: "Rockies Road Replica Jersey", size: "M", gender: "Men's", quantity: 9, unitPrice: 225.00, revenueLoss: 2025.00 },
    { collection: "City Connect", item: "Rockies City Connect Replica Jersey", size: "XL", gender: "Men's", quantity: 19, unitPrice: 200.00, revenueLoss: 3800.00 },
    { collection: "Home", item: "Rockies Home Player Jersey", size: "L", gender: "Men's", quantity: 14, unitPrice: 225.00, revenueLoss: 3150.00 },
    { collection: "Purple", item: "Rockies Purple Alternate Jersey", size: "M", gender: "Men's", quantity: 8, unitPrice: 200.00, revenueLoss: 1600.00 },
    { collection: "Heritage", item: "Rockies Black Vest Replica Jersey", size: "M", gender: "Men's", quantity: 18, unitPrice: 200.00, revenueLoss: 3600.00 },
    { collection: "Home", item: "Rockies Pinstripe Replica Jersey", size: "L", gender: "Men's", quantity: 11, unitPrice: 200.00, revenueLoss: 2200.00 },
    { collection: "City Connect", item: "Rockies City Connect Authentic Jersey", size: "L", gender: "Men's", quantity: 15, unitPrice: 225.00, revenueLoss: 3375.00 },
    { collection: "Road", item: "Rockies Road Authentic Jersey", size: "M", gender: "Men's", quantity: 9, unitPrice: 200.00, revenueLoss: 1800.00 },
    { collection: "Purple", item: "Rockies Mountain Logo Hoodie", size: "L", gender: "Men's", quantity: 19, unitPrice: 150.00, revenueLoss: 2850.00 },
    { collection: "Purple", item: "Rockies Purple Pullover Hoodie", size: "M", gender: "Men's", quantity: 13, unitPrice: 150.00, revenueLoss: 1950.00 },
    { collection: "Outerwear", item: "Rockies Dugout Jacket", size: "XL", gender: "Men's", quantity: 12, unitPrice: 275.00, revenueLoss: 3300.00 },
    { collection: "Women's", item: "Rockies Performance T-Shirt", size: "L", gender: "Women's", quantity: 22, unitPrice: 55.00, revenueLoss: 1210.00 },
    { collection: "Outerwear", item: "Rockies Quarter-Zip Pullover", size: "M", gender: "Men's", quantity: 16, unitPrice: 140.00, revenueLoss: 2240.00 },
    { collection: "Outerwear", item: "Rockies Bomber Jacket", size: "L", gender: "Men's", quantity: 8, unitPrice: 295.00, revenueLoss: 2360.00 },
    { collection: "Heritage", item: "Blake Street Bombers T-Shirt", size: "M", gender: "Men's", quantity: 28, unitPrice: 45.00, revenueLoss: 1260.00 },
    { collection: "Essentials", item: "Coors Field Crewneck Sweatshirt", size: "L", gender: "Men's", quantity: 14, unitPrice: 95.00, revenueLoss: 1330.00 },
    { collection: "Rockies Legends", item: "Todd Helton #17 Throwback Jersey", size: "L", gender: "Men's", quantity: 14, unitPrice: 220.00, revenueLoss: 3080.00 },
    { collection: "Outerwear", item: "Rockies Windbreaker", size: "M", gender: "Men's", quantity: 10, unitPrice: 120.00, revenueLoss: 1200.00 },
    { collection: "Rockies Legends", item: "Larry Walker #33 Throwback Jersey", size: "L", gender: "Men's", quantity: 11, unitPrice: 225.00, revenueLoss: 2475.00 },
    { collection: "Rockies Legends", item: "Todd Helton #17 Authentic Jersey", size: "M", gender: "Men's", quantity: 9, unitPrice: 200.00, revenueLoss: 1800.00 },
    { collection: "Kids", item: "Kids Rockies Home Jersey", size: "Youth L", gender: "Youth", quantity: 24, unitPrice: 100.00, revenueLoss: 2400.00 },
    { collection: "Kids", item: "Kids Rockies Purple Jersey", size: "Youth M", gender: "Youth", quantity: 18, unitPrice: 95.00, revenueLoss: 1710.00 },
  ];

  // Headwear Items
  const headwearItems: OutOfStockItem[] = [
    { collection: "On-Field", item: "Rockies CR 59FIFTY Fitted Cap", size: "7 1/4", gender: "Unisex", quantity: 42, unitPrice: 50.00, revenueLoss: 2100.00 },
    { collection: "On-Field", item: "Rockies CR 59FIFTY Fitted Cap", size: "7 3/8", gender: "Unisex", quantity: 35, unitPrice: 50.00, revenueLoss: 1750.00 },
    { collection: "Core", item: "Rockies Mountain 9FORTY Cap", size: "Adjustable", gender: "Unisex", quantity: 28, unitPrice: 35.00, revenueLoss: 980.00 },
    { collection: "Heritage", item: "Rockies Vintage CR Snapback", size: "Adjustable", gender: "Unisex", quantity: 31, unitPrice: 40.00, revenueLoss: 1240.00 },
    { collection: "City Connect", item: "Rockies City Connect 59FIFTY Cap", size: "7 1/2", gender: "Unisex", quantity: 35, unitPrice: 50.00, revenueLoss: 1750.00 },
    { collection: "City Connect", item: "Rockies City Connect 9FORTY Cap", size: "Adjustable", gender: "Unisex", quantity: 29, unitPrice: 35.00, revenueLoss: 1015.00 },
    { collection: "Outdoor", item: "Rockies Colorado Flag Trucker Hat", size: "Adjustable", gender: "Unisex", quantity: 18, unitPrice: 32.00, revenueLoss: 576.00 },
    { collection: "On-Field", item: "Rockies Purple 59FIFTY Fitted Cap", size: "7 1/4", gender: "Unisex", quantity: 38, unitPrice: 50.00, revenueLoss: 1900.00 },
    { collection: "Core", item: "Rockies Black 9FORTY Adjustable Cap", size: "Adjustable", gender: "Unisex", quantity: 22, unitPrice: 35.00, revenueLoss: 770.00 },
    { collection: "Purple", item: "Rockies Purple CR 59FIFTY Cap", size: "7 3/8", gender: "Unisex", quantity: 27, unitPrice: 50.00, revenueLoss: 1350.00 },
    { collection: "Outdoor", item: "Rockies Mountain Bucket Hat", size: "One Size", gender: "Unisex", quantity: 15, unitPrice: 38.00, revenueLoss: 570.00 },
    { collection: "Heritage", item: "Rockies Inaugural Season 59FIFTY Cap", size: "7 1/4", gender: "Unisex", quantity: 24, unitPrice: 50.00, revenueLoss: 1200.00 },
    { collection: "Core", item: "Rockies White CR 9FORTY Cap", size: "Adjustable", gender: "Unisex", quantity: 19, unitPrice: 35.00, revenueLoss: 665.00 },
    { collection: "Purple", item: "Rockies Purple Mountain Snapback", size: "Adjustable", gender: "Unisex", quantity: 16, unitPrice: 40.00, revenueLoss: 640.00 },
    { collection: "Kids", item: "Kids Rockies Adjustable Cap", size: "Youth", gender: "Youth", quantity: 33, unitPrice: 28.00, revenueLoss: 924.00 },
  ];

  // Game Used Items
  const gameUsedItems: OutOfStockItem[] = [
    { collection: "Rockies Authentics", item: "Charlie Blackmon Game-Used Bat (Signed)", size: "N/A", gender: "N/A", quantity: 3, unitPrice: 2500.00, revenueLoss: 7500.00 },
    { collection: "Rockies Authentics", item: "Charlie Blackmon Game-Used Jersey (Signed)", size: "N/A", gender: "N/A", quantity: 1, unitPrice: 5000.00, revenueLoss: 5000.00 },
    { collection: "Rockies Authentics", item: "Charlie Blackmon Game-Used Batting Gloves", size: "N/A", gender: "N/A", quantity: 5, unitPrice: 350.00, revenueLoss: 1750.00 },
    { collection: "Rockies Legends", item: "Larry Walker Game-Used Baseball (Signed)", size: "N/A", gender: "N/A", quantity: 7, unitPrice: 450.00, revenueLoss: 3150.00 },
    { collection: "Rockies Legends", item: "Todd Helton Game-Used Cleats", size: "N/A", gender: "N/A", quantity: 2, unitPrice: 800.00, revenueLoss: 1600.00 },
    { collection: "Rockies Legends", item: "Andrés Galarraga Game-Used Jersey (Signed)", size: "N/A", gender: "N/A", quantity: 2, unitPrice: 1800.00, revenueLoss: 3600.00 },
    { collection: "Rockies Legends", item: "Vinny Castilla Game-Used Helmet (Signed)", size: "N/A", gender: "N/A", quantity: 2, unitPrice: 850.00, revenueLoss: 1700.00 },
    { collection: "Rockies Legends", item: "Troy Tulowitzki Game-Used Cap (Signed)", size: "N/A", gender: "N/A", quantity: 3, unitPrice: 600.00, revenueLoss: 1800.00 },
    { collection: "Rockies Legends", item: "Carlos González Game-Used Baseball (Signed)", size: "N/A", gender: "N/A", quantity: 4, unitPrice: 425.00, revenueLoss: 1700.00 },
    { collection: "Rockies Legends", item: "Matt Holliday Game-Used Bat (Signed)", size: "N/A", gender: "N/A", quantity: 2, unitPrice: 1200.00, revenueLoss: 2400.00 },
    { collection: "Rockies Authentics", item: "Nolan Arenado Game-Used Jersey (Signed)", size: "N/A", gender: "N/A", quantity: 1, unitPrice: 3500.00, revenueLoss: 3500.00 },
    { collection: "Rockies Legends", item: "Larry Walker Game-Used Cleats", size: "N/A", gender: "N/A", quantity: 4, unitPrice: 1200.00, revenueLoss: 4800.00 },
    { collection: "Rockies Legends", item: "Todd Helton Game-Used Bat (Signed)", size: "N/A", gender: "N/A", quantity: 2, unitPrice: 3000.00, revenueLoss: 6000.00 },
    { collection: "Rockies Authentics", item: "Charlie Blackmon Game-Used Batting Gloves", size: "N/A", gender: "N/A", quantity: 3, unitPrice: 400.00, revenueLoss: 1200.00 },
  ];

  return {
    apparel: apparelItems,
    headwear: headwearItems,
    gameUsed: gameUsedItems,
  };
};

export function OutOfStockReport({ dateRange, onClose, isModal }: OutOfStockReportProps) {
  const data = generateOutOfStockData(dateRange);
  const reportRef = useRef<HTMLDivElement>(null);

  // Calculate totals
  const apparelTotal = data.apparel.reduce((sum, item) => sum + item.revenueLoss, 0);
  const apparelQty = data.apparel.reduce((sum, item) => sum + item.quantity, 0);
  
  const headwearTotal = data.headwear.reduce((sum, item) => sum + item.revenueLoss, 0);
  const headwearQty = data.headwear.reduce((sum, item) => sum + item.quantity, 0);
  
  const gameUsedTotal = data.gameUsed.reduce((sum, item) => sum + item.revenueLoss, 0);
  const gameUsedQty = data.gameUsed.reduce((sum, item) => sum + item.quantity, 0);
  
  const grandTotal = apparelTotal + headwearTotal + gameUsedTotal;
  const grandQty = apparelQty + headwearQty + gameUsedQty;

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

      pdf.save(`Colorado_Rockies_Missing_Merchandise_Report_${format(dateRange.from, "yyyy-MM-dd")}_to_${format(dateRange.to, "yyyy-MM-dd")}.pdf`);
    } catch (error) {
      console.error('PDF Error:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleEmail = () => {
    const subject = `Colorado Rockies Dugout Store - Missing Merchandise Report (${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d, yyyy")})`;
    const body = `Please find the Missing Merchandise Report for the period ${format(dateRange.from, "MMMM d, yyyy")} to ${format(dateRange.to, "MMMM d, yyyy")}.\n\nTotal Revenue Loss: $${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}\nTotal Items Requested: ${grandQty}\n\nCategories:\n- Apparel: ${apparelQty} items, $${apparelTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} loss\n- Headwear: ${headwearQty} items, $${headwearTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} loss\n- Game Used: ${gameUsedQty} items, $${gameUsedTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} loss`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Page mode - no overlay
  if (isModal === false) {
    return (
      <div className="w-full">
        {/* Hidden Download and Email Buttons for programmatic triggering */}
        <button
          onClick={handleDownloadPDF}
          data-report-download
          style={{ display: 'none' }}
        />
        <button
          onClick={handleEmail}
          data-report-email
          style={{ display: 'none' }}
        />
        
        <div className="px-6 py-6">
          <div ref={reportRef} style={{
            backgroundColor: '#ffffff',
            padding: '40px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#1f2937'
          }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <img src={rockiesDugoutStoreLogo} alt="Rockies Dugout Store" style={{ height: '112px' }} />
                <img src={jibeRetailLogo} alt="Jibe Retail" style={{ height: '80px' }} />
              </div>
              <div style={{ borderBottom: '3px solid #041e42', paddingBottom: '12px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#041e42', margin: '0 0 8px 0' }}>
                  Missing Merchandise Report
                </h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#6b7280', margin: 0 }}>
                    Colorado Rockies Dugout Store - Detailed Merchandise Availability Analysis
                  </p>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#9ca3af', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                      Report Period
                    </p>
                    <p style={{ fontSize: '16px', fontWeight: '900', color: '#BC0022', margin: 0 }}>
                      {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                    </p>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0 0 0' }}>
                      Generated: {format(new Date(), "MMM d, yyyy h:mm a")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#041e42', marginBottom: '12px', textTransform: 'uppercase' }}>
                Executive Summary
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: 'linear-gradient(135deg, #BC0022 0%, #d4002a 100%)', padding: '24px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'rgba(255,255,255,0.9)', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                    Total Revenue Loss
                  </p>
                  <p style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', margin: 0 }}>
                    ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #041e42 0%, #0a2f5f 100%)', padding: '24px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'rgba(255,255,255,0.9)', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                    Total Items Requested
                  </p>
                  <p style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', margin: 0 }}>
                    {grandQty}
                  </p>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#041e42', marginBottom: '12px', textTransform: 'uppercase' }}>
                Category Summary
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: 'linear-gradient(135deg, rgba(188,0,34,0.05) 0%, #ffffff 100%)' }}>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#6b7280', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                    Apparel
                  </p>
                  <p style={{ fontSize: '28px', fontWeight: '900', color: '#BC0022', margin: '0 0 8px 0' }}>
                    ${apparelTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563', margin: 0 }}>
                    {apparelQty} items requested
                  </p>
                </div>
                <div style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: 'linear-gradient(135deg, rgba(188,0,34,0.05) 0%, #ffffff 100%)' }}>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#6b7280', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                    Headwear
                  </p>
                  <p style={{ fontSize: '28px', fontWeight: '900', color: '#BC0022', margin: '0 0 8px 0' }}>
                    ${headwearTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563', margin: 0 }}>
                    {headwearQty} items requested
                  </p>
                </div>
                <div style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: 'linear-gradient(135deg, rgba(188,0,34,0.05) 0%, #ffffff 100%)' }}>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#6b7280', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                    Game Used
                  </p>
                  <p style={{ fontSize: '28px', fontWeight: '900', color: '#BC0022', margin: '0 0 8px 0' }}>
                    ${gameUsedTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563', margin: 0 }}>
                    {gameUsedQty} items requested
                  </p>
                </div>
              </div>
            </div>

            {/* Apparel Section */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#041e42', margin: 0, textTransform: 'uppercase' }}>
                  Apparel - Detailed Breakdown
                </h2>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', margin: '0 0 4px 0' }}>Category Total</p>
                  <p style={{ fontSize: '18px', fontWeight: '900', color: '#BC0022', margin: 0 }}>
                    ${apparelTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div style={{ border: '2px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(to right, #041e42, #0a2f5f)' }}>
                      <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Collection</th>
                      <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Item</th>
                      <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Size</th>
                      <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Gender</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Qty</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Unit Price</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Revenue Loss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.apparel.map((item, idx) => (
                      <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#1f2937' }}>{item.collection}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.item}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.size}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.gender}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#BC0022', textAlign: 'right' }}>{item.quantity}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#1f2937', textAlign: 'right' }}>${item.unitPrice.toFixed(2)}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#BC0022', textAlign: 'right' }}>${item.revenueLoss.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: '#041e42' }}>
                      <td colSpan={4} style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>
                        Apparel Totals
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                        {apparelQty}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                        -
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                        ${apparelTotal.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Headwear Section */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#041e42', margin: 0, textTransform: 'uppercase' }}>
                  Headwear - Detailed Breakdown
                </h2>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', margin: '0 0 4px 0' }}>Category Total</p>
                  <p style={{ fontSize: '18px', fontWeight: '900', color: '#BC0022', margin: 0 }}>
                    ${headwearTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div style={{ border: '2px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(to right, #041e42, #0a2f5f)' }}>
                      <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Collection</th>
                      <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Item</th>
                      <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Size</th>
                      <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Gender</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Qty</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Unit Price</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Revenue Loss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.headwear.map((item, idx) => (
                      <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#1f2937' }}>{item.collection}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.item}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.size}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.gender}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#BC0022', textAlign: 'right' }}>{item.quantity}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#1f2937', textAlign: 'right' }}>${item.unitPrice.toFixed(2)}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#BC0022', textAlign: 'right' }}>${item.revenueLoss.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: '#041e42' }}>
                      <td colSpan={4} style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>
                        Headwear Totals
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                        {headwearQty}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                        -
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                        ${headwearTotal.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Game Used Section */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#041e42', margin: 0, textTransform: 'uppercase' }}>
                  Game Used Merchandise - Detailed Breakdown
                </h2>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', margin: '0 0 4px 0' }}>Category Total</p>
                  <p style={{ fontSize: '18px', fontWeight: '900', color: '#BC0022', margin: 0 }}>
                    ${gameUsedTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div style={{ border: '2px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(to right, #041e42, #0a2f5f)' }}>
                      <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Collection</th>
                      <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Item</th>
                      <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Size</th>
                      <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Gender</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Qty</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Unit Price</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Revenue Loss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.gameUsed.map((item, idx) => (
                      <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#1f2937' }}>{item.collection}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.item}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.size}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.gender}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#BC0022', textAlign: 'right' }}>{item.quantity}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#1f2937', textAlign: 'right' }}>${item.unitPrice.toFixed(2)}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#BC0022', textAlign: 'right' }}>${item.revenueLoss.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: '#041e42' }}>
                      <td colSpan={4} style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>
                        Game Used Totals
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                        {gameUsedQty}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                        -
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                        ${gameUsedTotal.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Items */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#041e42', marginBottom: '12px', textTransform: 'uppercase' }}>
                Recommended Actions
              </h2>
              <div style={{ borderLeft: '4px solid #BC0022', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '0 8px 8px 0' }}>
                <ol style={{ fontSize: '14px', lineHeight: '1.8', color: '#4b5563', margin: '0 0 0 20px', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}>
                    <span style={{ fontWeight: '900', color: '#041e42' }}>Priority Restocking:</span> Immediately reorder high-demand Rockies items with the greatest revenue impact, particularly replica jerseys and on-field headwear.
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <span style={{ fontWeight: '900', color: '#041e42' }}>Size Analysis:</span> Review size distribution patterns to optimize inventory levels. Size L and XL show highest demand across multiple categories.
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <span style={{ fontWeight: '900', color: '#041e42' }}>Rockies Authentics Program:</span> Coordinate with Rockies Authentics to maintain a consistent supply of authenticated Colorado Rockies game-used memorabilia.
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <span style={{ fontWeight: '900', color: '#041e42' }}>Pre-Order System:</span> Implement customer notification and pre-order capabilities for high-value game-used items to capture demand when out of stock.
                  </li>
                  <li>
                    <span style={{ fontWeight: '900', color: '#041e42' }}>Inventory Alerts:</span> Set automated low-stock alerts for top 20 revenue-generating items to prevent future stockouts.
                  </li>
                </ol>
              </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '2px solid #e5e7eb', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#9ca3af', margin: '0 0 4px 0' }}>
                Colorado Rockies Dugout Store • Missing Merchandise Report • Confidential
              </p>
              <p style={{ fontSize: '10px', color: '#d1d5db', margin: 0 }}>
                Generated on {format(new Date(), "MMMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '16px'
    }}>
      {/* Buttons */}
      <div style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        display: 'flex',
        gap: '8px',
        zIndex: 60
      }}>
        <button
          onClick={handleEmail}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            color: '#041e42',
            border: '2px solid #041e42',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          <Mail size={16} />
          Email
        </button>
        <button
          onClick={handleDownloadPDF}
          data-report-download
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#041e42',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          <Download size={16} />
          Download PDF
        </button>
        <button
          onClick={onClose}
          style={{
            padding: '8px',
            backgroundColor: '#ffffff',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          <X size={20} color="#374151" />
        </button>
      </div>

      {/* Report Container */}
      <div style={{
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div ref={reportRef} style={{
          backgroundColor: '#ffffff',
          padding: '40px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#1f2937'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <img src={rockiesDugoutStoreLogo} alt="Rockies Dugout Store" style={{ height: '112px' }} />
              <img src={jibeRetailLogo} alt="Jibe Retail" style={{ height: '80px' }} />
            </div>
            <div style={{ borderBottom: '3px solid #041e42', paddingBottom: '12px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#041e42', margin: '0 0 8px 0' }}>
                Missing Merchandise Report
              </h1>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#6b7280', margin: 0 }}>
                  Colorado Rockies Dugout Store - Detailed Merchandise Availability Analysis
                </p>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#9ca3af', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                    Report Period
                  </p>
                  <p style={{ fontSize: '16px', fontWeight: '900', color: '#BC0022', margin: 0 }}>
                    {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                  </p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0 0 0' }}>
                    Generated: {format(new Date(), "MMM d, yyyy h:mm a")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#041e42', marginBottom: '12px', textTransform: 'uppercase' }}>
              Executive Summary
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: 'linear-gradient(135deg, #BC0022 0%, #d4002a 100%)', padding: '24px', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'rgba(255,255,255,0.9)', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                  Total Revenue Loss
                </p>
                <p style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', margin: 0 }}>
                  ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #041e42 0%, #0a2f5f 100%)', padding: '24px', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'rgba(255,255,255,0.9)', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                  Total Items Requested
                </p>
                <p style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', margin: 0 }}>
                  {grandQty}
                </p>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#041e42', marginBottom: '12px', textTransform: 'uppercase' }}>
              Category Summary
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: 'linear-gradient(135deg, rgba(188,0,34,0.05) 0%, #ffffff 100%)' }}>
                <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#6b7280', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                  Apparel
                </p>
                <p style={{ fontSize: '28px', fontWeight: '900', color: '#BC0022', margin: '0 0 8px 0' }}>
                  ${apparelTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563', margin: 0 }}>
                  {apparelQty} items requested
                </p>
              </div>
              <div style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: 'linear-gradient(135deg, rgba(188,0,34,0.05) 0%, #ffffff 100%)' }}>
                <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#6b7280', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                  Headwear
                </p>
                <p style={{ fontSize: '28px', fontWeight: '900', color: '#BC0022', margin: '0 0 8px 0' }}>
                  ${headwearTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563', margin: 0 }}>
                  {headwearQty} items requested
                </p>
              </div>
              <div style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: 'linear-gradient(135deg, rgba(188,0,34,0.05) 0%, #ffffff 100%)' }}>
                <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#6b7280', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                  Game Used
                </p>
                <p style={{ fontSize: '28px', fontWeight: '900', color: '#BC0022', margin: '0 0 8px 0' }}>
                  ${gameUsedTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563', margin: 0 }}>
                  {gameUsedQty} items requested
                </p>
              </div>
            </div>
          </div>

          {/* Apparel Section */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#041e42', margin: 0, textTransform: 'uppercase' }}>
                Apparel - Detailed Breakdown
              </h2>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', margin: '0 0 4px 0' }}>Category Total</p>
                <p style={{ fontSize: '18px', fontWeight: '900', color: '#BC0022', margin: 0 }}>
                  ${apparelTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <div style={{ border: '2px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(to right, #041e42, #0a2f5f)' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Collection</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Item</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Size</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Gender</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Qty</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Unit Price</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Revenue Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {data.apparel.map((item, idx) => (
                    <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#1f2937' }}>{item.collection}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.item}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.size}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.gender}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#BC0022', textAlign: 'right' }}>{item.quantity}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#1f2937', textAlign: 'right' }}>${item.unitPrice.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#BC0022', textAlign: 'right' }}>${item.revenueLoss.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: '#041e42' }}>
                    <td colSpan={4} style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>
                      Apparel Totals
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                      {apparelQty}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                      -
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                      ${apparelTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Headwear Section */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#041e42', margin: 0, textTransform: 'uppercase' }}>
                Headwear - Detailed Breakdown
              </h2>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', margin: '0 0 4px 0' }}>Category Total</p>
                <p style={{ fontSize: '18px', fontWeight: '900', color: '#BC0022', margin: 0 }}>
                  ${headwearTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <div style={{ border: '2px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(to right, #041e42, #0a2f5f)' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Collection</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Item</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Size</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Gender</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Qty</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Unit Price</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Revenue Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {data.headwear.map((item, idx) => (
                    <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#1f2937' }}>{item.collection}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.item}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.size}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.gender}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#BC0022', textAlign: 'right' }}>{item.quantity}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#1f2937', textAlign: 'right' }}>${item.unitPrice.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#BC0022', textAlign: 'right' }}>${item.revenueLoss.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: '#041e42' }}>
                    <td colSpan={4} style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>
                      Headwear Totals
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                      {headwearQty}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                      -
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                      ${headwearTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Game Used Section */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#041e42', margin: 0, textTransform: 'uppercase' }}>
                Game Used Merchandise - Detailed Breakdown
              </h2>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', margin: '0 0 4px 0' }}>Category Total</p>
                <p style={{ fontSize: '18px', fontWeight: '900', color: '#BC0022', margin: 0 }}>
                  ${gameUsedTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <div style={{ border: '2px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(to right, #041e42, #0a2f5f)' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Collection</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Item</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Size</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Gender</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Qty</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Unit Price</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '11px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>Revenue Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {data.gameUsed.map((item, idx) => (
                    <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#1f2937' }}>{item.collection}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.item}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.size}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#4b5563' }}>{item.gender}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#BC0022', textAlign: 'right' }}>{item.quantity}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#1f2937', textAlign: 'right' }}>${item.unitPrice.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '900', color: '#BC0022', textAlign: 'right' }}>${item.revenueLoss.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: '#041e42' }}>
                    <td colSpan={4} style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textTransform: 'uppercase' }}>
                      Game Used Totals
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                      {gameUsedQty}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                      -
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '900', color: '#ffffff', textAlign: 'right' }}>
                      ${gameUsedTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Items */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#041e42', marginBottom: '12px', textTransform: 'uppercase' }}>
              Recommended Actions
            </h2>
            <div style={{ borderLeft: '4px solid #BC0022', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '0 8px 8px 0' }}>
              <ol style={{ fontSize: '14px', lineHeight: '1.8', color: '#4b5563', margin: '0 0 0 20px', padding: 0 }}>
                <li style={{ marginBottom: '10px' }}>
                  <span style={{ fontWeight: '900', color: '#041e42' }}>Priority Restocking:</span> Immediately reorder high-demand Rockies items with the greatest revenue impact, particularly replica jerseys and on-field headwear.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <span style={{ fontWeight: '900', color: '#041e42' }}>Size Analysis:</span> Review size distribution patterns to optimize inventory levels. Size L and XL show highest demand across multiple categories.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <span style={{ fontWeight: '900', color: '#041e42' }}>Rockies Authentics Program:</span> Coordinate with Rockies Authentics to maintain a consistent supply of authenticated Colorado Rockies game-used memorabilia.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <span style={{ fontWeight: '900', color: '#041e42' }}>Pre-Order System:</span> Implement customer notification and pre-order capabilities for high-value game-used items to capture demand when out of stock.
                </li>
                <li>
                  <span style={{ fontWeight: '900', color: '#041e42' }}>Inventory Alerts:</span> Set automated low-stock alerts for top 20 revenue-generating items to prevent future stockouts.
                </li>
              </ol>
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '2px solid #e5e7eb', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#9ca3af', margin: '0 0 4px 0' }}>
              Colorado Rockies Dugout Store • Missing Merchandise Report • Confidential
            </p>
            <p style={{ fontSize: '10px', color: '#d1d5db', margin: 0 }}>
              Generated on {format(new Date(), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
