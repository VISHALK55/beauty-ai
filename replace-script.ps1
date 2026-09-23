$folderPath = "c:\Users\welcome\.gemini\antigravity-ide\scratch\beauty-ai\heena-frontend\src"

$replacements = @{
    "Pihu Makeover" = "Heena Makeover"
    "Pihu" = "Heena"
    "Bindu Sharma" = "Heena"
    "\+91 91137 15558" = "+91 97080 81187"
    "9113715558" = "9708081187"
    "bindupihu@gmail.com" = "contact@heenamakeover.com"
    "https://www.instagram.com/pihu_makeover22" = "https://www.instagram.com/heena_makeover_salon_"
    "Rajapur, Sujata Rd, near Govt. Middle School, Upadhayay Bigha, Bodh Gaya, Bihar 824231" = "Katari Hill Rd, near Rose Palace, Aliganj, Gaya, Bihar 823001"
    "Rajapur, Sujata Rd, near Govt. Middle School" = "Katari Hill Rd, near Rose Palace"
    "Bodhgaya" = "Gaya"
    "Bodh Gaya" = "Gaya"
}

Get-ChildItem -Path $folderPath -Recurse -File | Where-Object { $_.Extension -match "\.(jsx|js|html)$" } | ForEach-Object {
    $content = Get-Content -Path $_.FullName -Raw
    $modified = $false
    foreach ($key in $replacements.Keys) {
        if ($content -match $key) {
            $content = $content -replace $key, $replacements[$key]
            $modified = $true
        }
    }
    if ($modified) {
        Set-Content -Path $_.FullName -Value $content
        Write-Host "Updated $($_.FullName)"
    }
}
Write-Host "Done replacing."
