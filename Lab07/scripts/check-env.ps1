Write-Host '== TeamFlow - verification des outils =='
java -version
mvn -version
node --version
npm --version
git --version
Write-Host 'Vérifiez ensuite http://localhost:8080/api/health et http://localhost:4200.'
