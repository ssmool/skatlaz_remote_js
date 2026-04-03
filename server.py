#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import http.server
import socketserver
import os
import json
import urllib.parse
from pathlib import Path

PORT = 8000

class SkatlazHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Handler personalizado para servir os arquivos com suporte CORS"""
    
    def end_headers(self):
        # Adiciona headers CORS para permitir requisições
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
    
    def do_OPTIONS(self):
        # Responde a requisições preflight CORS
        self.send_response(200)
        self.end_headers()
    
    def do_GET(self):
        # Rota específica para API de dados
        if self.path == '/api/data':
            self.serve_api_data()
        else:
            # Serve arquivos estáticos normalmente
            super().do_GET()
    
    def serve_api_data(self):
        """Endpoint de API que retorna dados em JSON"""
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        # Dados de exemplo para a API
        api_data = {
            "title": "Dados da API Python",
            "description": "Este conteúdo foi carregado via API do servidor Python!",
            "value": "Carregado em: " + str(self.date_time_string()),
            "status": "success",
            "version": "1.0"
        }
        
        self.wfile.write(json.dumps(api_data, indent=2).encode('utf-8'))
    
    def log_message(self, format, *args):
        # Log personalizado com cores
        print(f"\033[92m[Servidor]\033[0m {format % args}")

def create_sample_files():
    """Cria arquivos de exemplo se não existirem"""
    
    # Cria data.json
    if not os.path.exists('data.json'):
        sample_json = {
            "title": "Dados do Arquivo JSON",
            "description": "Este conteúdo veio do arquivo data.json",
            "value": "Valor: 42",
            "author": "Skatlaz",
            "date": "2024"
        }
        with open('data.json', 'w') as f:
            json.dump(sample_json, f, indent=2)
        print("\033[93m✓ Criado data.json\033[0m")
    
    # Cria sample.csv
    if not os.path.exists('sample.csv'):
        csv_content = """nome,idade,cidade,profissao
João Silva,25,São Paulo,Desenvolvedor
Maria Santos,30,Rio de Janeiro,Designer
Carlos Oliveira,35,Belo Horizonte,Analista
Ana Souza,28,Porto Alegre,Engenheira
Pedro Costa,32,Salvador,Arquiteto"""
        with open('sample.csv', 'w') as f:
            f.write(csv_content)
        print("\033[93m✓ Criado sample.csv\033[0m")
    
    # Cria sample.xml
    if not os.path.exists('sample.xml'):
        xml_content = '''<?xml version="1.0" encoding="UTF-8"?>
<produtos>
    <produto>
        <id>1</id>
        <nome>Notebook</nome>
        <preco>3500.00</preco>
        <categoria>Eletrônicos</categoria>
    </produto>
    <produto>
        <id>2</id>
        <nome>Mouse</nome>
        <preco>150.00</preco>
        <categoria>Eletrônicos</categoria>
    </produto>
    <produto>
        <id>3</id>
        <nome>Teclado</nome>
        <preco>250.00</preco>
        <categoria>Eletrônicos</categoria>
    </produto>
</produtos>'''
        with open('sample.xml', 'w') as f:
            f.write(xml_content)
        print("\033[93m✓ Criado sample.xml\033[0m")
    
    # Cria sample.rss
    if not os.path.exists('sample.rss'):
        rss_content = '''<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>Blog Skatlaz</title>
        <link>http://example.com</link>
        <description>Exemplo de feed RSS</description>
        <item>
            <title>Primeiro Post</title>
            <link>http://example.com/post1</link>
            <description>Conteúdo do primeiro post</description>
            <pubDate>Mon, 01 Jan 2024 12:00:00 GMT</pubDate>
            <author>autor@example.com</author>
        </item>
        <item>
            <title>Segundo Post</title>
            <link>http://example.com/post2</link>
            <description>Conteúdo do segundo post</description>
            <pubDate>Tue, 02 Jan 2024 12:00:00 GMT</pubDate>
            <author>autor@example.com</author>
        </item>
    </channel>
</rss>'''
        with open('sample.rss', 'w') as f:
            f.write(rss_content)
        print("\033[93m✓ Criado sample.rss\033[0m")

def main():
    """Função principal para iniciar o servidor"""
    
    print("\n" + "="*60)
    print("\033[96m🚀 SKATLAZ REMOTE JS - Servidor Python\033[0m")
    print("="*60)
    
    # Cria arquivos de exemplo
    print("\n\033[94m📁 Preparando arquivos de exemplo...\033[0m")
    create_sample_files()
    
    # Verifica se example.html existe
    if not os.path.exists('example.html'):
        print("\n\033[91m❌ ERRO: example.html não encontrado!\033[0m")
        print("Certifique-se que o arquivo example.html está no mesmo diretório.")
        return
    
    # Configura e inicia o servidor
    os.chdir(Path(__file__).parent)
    
    print("\n\033[94m🌐 Iniciando servidor HTTP...\033[0m")
    print(f"\033[92m✓ Servidor rodando em: http://localhost:{PORT}\033[0m")
    print(f"\033[92m✓ Acesse: http://localhost:{PORT}/example.html\033[0m")
    print("\n\033[93m📋 Endpoints disponíveis:\033[0m")
    print(f"  • http://localhost:{PORT}/example.html - Página principal")
    print(f"  • http://localhost:{PORT}/data.json - Dados JSON")
    print(f"  • http://localhost:{PORT}/sample.csv - Exemplo CSV")
    print(f"  • http://localhost:{PORT}/sample.xml - Exemplo XML")
    print(f"  • http://localhost:{PORT}/sample.rss - Exemplo RSS")
    print(f"  • http://localhost:{PORT}/api/data - API JSON")
    
    print("\n\033[93m💡 Comandos úteis:\033[0m")
    print("  • Ctrl+C - Parar o servidor")
    print("  • Abra outro terminal para mais comandos")
    
    print("\n\033[96m" + "="*60)
    print("✅ Servidor pronto! Aguardando requisições...")
    print("="*60 + "\033[0m\n")
    
    try:
        with socketserver.TCPServer(("", PORT), SkatlazHTTPRequestHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n\033[93m🛑 Servidor interrompido pelo usuário\033[0m")
    except OSError as e:
        if e.errno == 98:  # Porta já em uso
            print(f"\n\033[91m❌ Erro: Porta {PORT} já está em uso!\033[0m")
            print(f"Tente matar o processo ou use uma porta diferente.")
            print(f"Para matar: sudo lsof -ti:{PORT} | xargs kill -9")
        else:
            print(f"\n\033[91m❌ Erro: {e}\033[0m")

if __name__ == '__main__':
    main()
