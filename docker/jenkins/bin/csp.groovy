// Set correct CSP for Jenkins so that we can view HTML reports with pretty colors.
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "sandbox allow-scripts;")