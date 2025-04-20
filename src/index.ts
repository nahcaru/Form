// Types for our form data
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp?: string;
}

/**
 * Handles POST requests from the Next.js contact form
 */
function doPost(
  e: GoogleAppsScript.Events.DoPost
): GoogleAppsScript.Content.TextOutput {
  try {
    // Parse the incoming JSON data
    const formData: ContactFormData = JSON.parse(e.postData.contents);

    // Add a timestamp
    formData.timestamp = new Date().toISOString();

    // Save the data to the spreadsheet
    saveToSheet(formData);

    // Send email notification
    sendEmailNotification(formData);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Form submission received successfully",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Log the error and return an error response
    console.error("Error processing form submission:", error);
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Failed to process form submission",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Saves the form data to the attached spreadsheet
 */
function saveToSheet(formData: ContactFormData): void {
  // Get the active spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet =
    ss.getSheetByName("Contact Submissions") ||
    ss.insertSheet("Contact Submissions");

  // Set up headers if they don't exist
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Name", "Email", "Subject", "Message"]);
    sheet.getRange("A1:E1").setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  // Append the new form data
  sheet.appendRow([
    formData.timestamp,
    formData.name,
    formData.email,
    formData.subject,
    formData.message,
  ]);

  // Auto-resize columns to fit content
  sheet.autoResizeColumns(1, 5);
}

/**
 * Sends an email notification when a new form submission is received
 */
function sendEmailNotification(formData: ContactFormData): void {
  const userEmail =
    PropertiesService.getScriptProperties().getProperty("NOTIFICATION_EMAIL")!;
  const subject = `New Contact Form Submission: ${formData.subject}`;

  const body = `
    You have received a new message from your portfolio contact form:
    
    Name: ${formData.name}
    Email: ${formData.email}
    Subject: ${formData.subject}
    Time: ${new Date(formData.timestamp!).toLocaleString()}
    
    Message:
    ${formData.message}
  `;

  GmailApp.sendEmail(userEmail, subject, body);
}

/**
 * Creates a test submission (for development and testing)
 */
function testFormSubmission() {
  const testData: ContactFormData = {
    name: "Test User",
    email: "test@example.com",
    subject: "Test Subject",
    message: "This is a test message from the Google Apps Script.",
    timestamp: new Date().toISOString(),
  };

  saveToSheet(testData);
  sendEmailNotification(testData);
}

/**
 * Setup function to be run once after deployment
 */
function setUp() {
  // Create the Contact Submissions sheet if it doesn't exist
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss.getSheetByName("Contact Submissions")) {
    const sheet = ss.insertSheet("Contact Submissions");
    sheet.appendRow(["Timestamp", "Name", "Email", "Subject", "Message"]);
    sheet.getRange("A1:E1").setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, 5);
  }
}
