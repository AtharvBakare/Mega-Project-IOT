
    // Navigation function
    function showSection(sectionId) {
      // Hide all sections
      document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
      });
      
      // Show the selected section
      document.getElementById(sectionId).classList.add('active');
    }
    
    // Set active link
    function setActiveLink(clickedLink) {
      // Remove active class from all links
      document.querySelectorAll('.sidebar a').forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to clicked link
      clickedLink.classList.add('active');
    }

    // UPDATED HOME SECTION SCRIPT
    document.addEventListener("DOMContentLoaded", () => {
      // Home section elements
      const unitInput = document.getElementById("unitInput");
      const confirmBtn = document.getElementById("confirmBtn");
      const startBtn = document.getElementById("startBtn");
      const stopBtn = document.getElementById("stopBtn");
      const resetBtn = document.getElementById("resetBtn");
      const unitDisplay = document.getElementById("unitDisplay");
      const meterValue = document.getElementById("meterValue");
      const rupeeValue = document.getElementById("rupeeValue");
      const chargingStatus = document.getElementById("chargingStatus");
      const meter = document.getElementById("meter");
      const rupeePlaceholder = document.getElementById("rupeePlaceholder");
      const pulse = document.getElementById("pulse");
      const meterFill = document.getElementById("meterFill");
      const rupeeFill = document.getElementById("rupeeFill");

      let unit = 0;
      let currentMeter = 0;
      let interval = null;
      const pricePerUnit = 10; // Price per unit in rupees

      // Confirm the unit and enable the Start button
      confirmBtn.addEventListener("click", () => {
        unit = parseInt(unitInput.value, 10) || 0;
        if (unit > 0) {
          unitDisplay.textContent = unit;
          meter.textContent = `0 / ${unit}`;
          rupeePlaceholder.textContent = `₹0 / ₹${unit * pricePerUnit}`;
          startBtn.disabled = false;
          resetBtn.disabled = true; // Reset remains disabled until Stop is clicked
          chargingStatus.textContent = "Ready";
          chargingStatus.style.color = "#FFC107"; // Yellow for ready state
        } else {
          alert("Please enter a valid unit greater than 0.");
        }
      });

      // Start animation
      startBtn.addEventListener("click", () => {
        if (unit <= 0 || currentMeter >= unit) return;

        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = true; // Disable Reset while running
        chargingStatus.textContent = "Charging";
        chargingStatus.style.color = "#4CAF50"; // Green for active state

        pulse.classList.add("active"); // Activate pulse animation

        interval = setInterval(() => {
          currentMeter++;
          meterValue.textContent = currentMeter;
          rupeeValue.textContent = currentMeter * pricePerUnit;
          meter.textContent = `${currentMeter} / ${unit}`;
          rupeePlaceholder.textContent = `₹${currentMeter * pricePerUnit} / ₹${unit * pricePerUnit}`;
          
          // Update progress bars
          const meterPercent = (currentMeter / unit) * 100;
          meterFill.style.width = `${meterPercent}%`;
          rupeeFill.style.width = `${meterPercent}%`;

          if (currentMeter >= unit) {
            clearInterval(interval);
            stopAnimation();
            chargingStatus.textContent = "Completed";
            chargingStatus.style.color = "#2196F3"; // Blue for completed state
          }
        }, 1000);
      });

      // Stop animation manually (Pause functionality)
      stopBtn.addEventListener("click", () => {
        stopAnimation();
        resetBtn.disabled = false; // Enable Reset button after stopping
        chargingStatus.textContent = "Paused";
        chargingStatus.style.color = "#FF9800"; // Orange for paused state
      });

      function stopAnimation() {
        clearInterval(interval);
        startBtn.disabled = false;
        stopBtn.disabled = true;
        pulse.classList.remove("active"); // Stop pulse animation
      }

      // Reset button functionality
      resetBtn.addEventListener("click", () => {
        unit = 0;
        currentMeter = 0;
        unitInput.value = "";
        unitDisplay.textContent = "0";
        meterValue.textContent = "0";
        rupeeValue.textContent = "0";
        meter.textContent = "0 / 0";
        rupeePlaceholder.textContent = "₹0 / ₹0";
        meterFill.style.width = "0%";
        rupeeFill.style.width = "0%";
        startBtn.disabled = true;
        stopBtn.disabled = true;
        resetBtn.disabled = true; // Disable Reset button again until Stop is clicked
        pulse.classList.remove("active");
        chargingStatus.textContent = "Ready";
        chargingStatus.style.color = "#999"; // Gray for reset state
      });

      // RECEIPT SECTION SCRIPT
      /*const generateBtn = document.getElementById('generateBtn');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetFormBtn = document.getElementById('resetFormBtn');
      
      function generateReceiptId() {
        const prefix = "EVC";
        const timestamp = new Date().getTime().toString().slice(-6);
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${prefix}-${timestamp}-${random}`;
      }

      generateBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const vehicleNumber = document.getElementById('vehicleNumber').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const aadharNumber = document.getElementById('aadharNumber').value;
        const address = document.getElementById('address').value;
        const unitConsumption = parseFloat(document.getElementById('unitConsumption').value);
        const cost = parseFloat(document.getElementById('cost').value);

        if (!name || !vehicleNumber || !phoneNumber || !aadharNumber*/
      const generateBtn = document.getElementById('generateBtn');
      const downloadBtn = document.getElementById('downloadBtn');
      const resetFormBtn = document.getElementById('resetFormBtn');
      
      function generateReceiptId() {
        const prefix = "EVC";
        const timestamp = new Date().getTime().toString().slice(-6);
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${prefix}-${timestamp}-${random}`;
      }

      generateBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const vehicleNumber = document.getElementById('vehicleNumber').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const aadharNumber = document.getElementById('aadharNumber').value;
        const address = document.getElementById('address').value;
        const unitConsumption = parseFloat(document.getElementById('unitConsumption').value);
        const cost = parseFloat(document.getElementById('cost').value);

        if (!name || !vehicleNumber || !phoneNumber || !aadharNumber || !address || isNaN(unitConsumption) || isNaN(cost)) {
          alert('Please fill all fields correctly');
          return;
        }

        const totalAmount = unitConsumption * cost;
        const now = new Date();
        const dateString = now.toLocaleDateString();
        const timeString = now.toLocaleTimeString();
        const receiptId = generateReceiptId();

        document.getElementById('receiptId').textContent = receiptId;
        document.getElementById('currentDate').textContent = dateString;
        document.getElementById('currentTime').textContent = timeString;
        document.getElementById('receiptName').textContent = name;
        document.getElementById('receiptVehicleNumber').textContent = vehicleNumber;
        document.getElementById('receiptPhoneNumber').textContent = phoneNumber;
        document.getElementById('receiptAadharNumber').textContent = aadharNumber;
        document.getElementById('receiptAddress').textContent = address;
        document.getElementById('receiptUnitConsumption').textContent = unitConsumption + ' units';
        document.getElementById('receiptCost').textContent = '₹' + cost + ' per kWh';
        document.getElementById('receiptTotalAmount').textContent = '₹' + totalAmount.toFixed(2);

        document.getElementById('receiptOutput').style.display = 'block';
        document.getElementById('downloadBtn').style.display = 'inline-block';
      });

      downloadBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const receipt = document.getElementById('receiptOutput');

        html2canvas(receipt).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          const receiptId = document.getElementById('receiptId').textContent;
          pdf.save(`E-Vehicle_Charging_Receipt_${receiptId}.pdf`);
        });
      });

      resetFormBtn.addEventListener('click', () => {
        document.getElementById('receiptForm').reset();
        document.getElementById('receiptOutput').style.display = 'none';
      });
    });
  