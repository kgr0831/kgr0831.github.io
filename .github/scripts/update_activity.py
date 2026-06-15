import subprocess
import os
import re
import time
import html

def run_git_command(cmd, cwd):
    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True, encoding='utf-8')
        return result.stdout.strip()
    except Exception as e:
        print(f"Error running git command {cmd}: {e}")
        return ""

def main():
    # Resolve paths relative to repository root
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.abspath(os.path.join(script_dir, "..", ".."))
    
    svg_path = os.path.join(repo_root, "assets", "commits_terminal.svg")
    readme_path = os.path.join(repo_root, "README.md")
    
    # Ensure assets directory exists
    os.makedirs(os.path.join(repo_root, "assets"), exist_ok=True)
    
    # 1. Fetch latest 5 commits
    git_log_output = run_git_command(["git", "log", "-n", "5", "--pretty=format:%h|%s|%cr"], repo_root)
    
    commits = []
    if git_log_output:
        for line in git_log_output.split("\n"):
            parts = line.split("|")
            if len(parts) == 3:
                commits.append({
                    "hash": parts[0],
                    "msg": parts[1],
                    "time": parts[2]
                })
    
    # Pad with empty slots if fewer than 5 commits
    while len(commits) < 5:
        commits.append({
            "hash": "-------",
            "msg": "No commit records available",
            "time": ""
        })
        
    # Process commit text for SVG
    processed_commits = []
    for c in commits:
        h = html.escape(c["hash"])
        m = c["msg"]
        t = c["time"]
        
        # Truncate message to fit SVG terminal width nicely
        max_len = 50
        if len(m) > max_len:
            m = m[:max_len-3] + "..."
        m = html.escape(m)
        
        # Clean relative time string
        if t:
            t = f"({html.escape(t)})"
        else:
            t = ""
            
        processed_commits.append({
            "hash": h,
            "msg": m,
            "time": t
        })
        
    # 2. Build SVG Content
    svg_template = f"""<svg xmlns="http://www.w3.org/2000/svg" width="760" height="240" viewBox="0 0 760 240" fill="none">
  <style>
    .terminal-card {{
      fill: #0b0f19;
      stroke: #1f2937;
      stroke-width: 1.5;
      filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
    }}
    .win-title {{
      font-family: 'JetBrains Mono', 'Fira Code', 'Segoe UI Mono', Consolas, Monaco, monospace;
      font-size: 11px;
      fill: #4b5563;
    }}
    .console-text {{
      font-family: 'JetBrains Mono', 'Fira Code', 'Segoe UI Mono', Consolas, Monaco, monospace;
      font-size: 13px;
      fill: #f1f5f9;
    }}
    .prompt-user {{
      fill: #22c55e;
      font-weight: bold;
    }}
    .prompt-cmd {{
      fill: #f59e0b;
    }}
    .commit-hash {{
      fill: #38bdf8;
      font-weight: bold;
    }}
    .commit-msg {{
      fill: #e2e8f0;
    }}
    .commit-time {{
      fill: #64748b;
      font-size: 11px;
    }}
    .cursor {{
      fill: #a3b8cc;
      animation: blink 0.8s step-end infinite;
    }}
    @keyframes blink {{
      0%, 100% {{ opacity: 1; }}
      50% {{ opacity: 0; }}
    }}
    .line {{
      opacity: 0;
      animation: fadeIn 0.4s ease forwards;
    }}
    .line-1 {{ animation-delay: 0.8s; }}
    .line-2 {{ animation-delay: 1.1s; }}
    .line-3 {{ animation-delay: 1.4s; }}
    .line-4 {{ animation-delay: 1.7s; }}
    .line-5 {{ animation-delay: 2.0s; }}
    
    @keyframes fadeIn {{
      from {{
        opacity: 0;
        transform: translateY(3px);
      }}
      to {{
        opacity: 1;
        transform: translateY(0);
      }}
    }}
  </style>

  <!-- Terminal Background -->
  <rect class="terminal-card" x="2" y="2" width="756" height="236" rx="12" />

  <!-- Glowing Neon Border Accent -->
  <rect x="2" y="2" width="756" height="236" rx="12" fill="none" stroke="url(#neon-glow)" stroke-width="1.5" opacity="0.4" />

  <!-- Window Header -->
  <!-- MacOS Buttons -->
  <circle cx="20" cy="20" r="6" fill="#ff5f56" />
  <circle cx="40" cy="20" r="6" fill="#ffbd2e" />
  <circle cx="60" cy="20" r="6" fill="#27c93f" />

  <!-- Terminal Title -->
  <text x="380" y="24" text-anchor="middle" class="win-title">kgr0831@terminal: ~/activity</text>

  <!-- Separator Line -->
  <line x1="2" y1="38" x2="758" y2="38" stroke="#1f2937" stroke-width="1" />

  <!-- Terminal Contents -->
  <g transform="translate(20, 0)">
    <!-- Command Input Line -->
    <text x="0" y="65" class="console-text">
      <tspan class="prompt-user">kgr0831 $</tspan> <tspan class="prompt-cmd">git log --oneline -n 5</tspan>
    </text>
    <!-- Blinking Cursor next to command -->
    <rect class="cursor" x="236" y="52" width="7" height="15" />

    <!-- Commit Lines -->
    <!-- Line 1 -->
    <g class="line line-1">
      <text x="0" y="95" class="console-text">
        <tspan class="commit-hash">{processed_commits[0]["hash"]}</tspan> - <tspan class="commit-msg">{processed_commits[0]["msg"]}</tspan> <tspan class="commit-time">{processed_commits[0]["time"]}</tspan>
      </text>
    </g>

    <!-- Line 2 -->
    <g class="line line-2">
      <text x="0" y="123" class="console-text">
        <tspan class="commit-hash">{processed_commits[1]["hash"]}</tspan> - <tspan class="commit-msg">{processed_commits[1]["msg"]}</tspan> <tspan class="commit-time">{processed_commits[1]["time"]}</tspan>
      </text>
    </g>

    <!-- Line 3 -->
    <g class="line line-3">
      <text x="0" y="151" class="console-text">
        <tspan class="commit-hash">{processed_commits[2]["hash"]}</tspan> - <tspan class="commit-msg">{processed_commits[2]["msg"]}</tspan> <tspan class="commit-time">{processed_commits[2]["time"]}</tspan>
      </text>
    </g>

    <!-- Line 4 -->
    <g class="line line-4">
      <text x="0" y="179" class="console-text">
        <tspan class="commit-hash">{processed_commits[3]["hash"]}</tspan> - <tspan class="commit-msg">{processed_commits[3]["msg"]}</tspan> <tspan class="commit-time">{processed_commits[3]["time"]}</tspan>
      </text>
    </g>

    <!-- Line 5 -->
    <g class="line line-5">
      <text x="0" y="207" class="console-text">
        <tspan class="commit-hash">{processed_commits[4]["hash"]}</tspan> - <tspan class="commit-msg">{processed_commits[4]["msg"]}</tspan> <tspan class="commit-time">{processed_commits[4]["time"]}</tspan>
      </text>
    </g>
  </g>

  <!-- Defs for Gradients -->
  <defs>
    <linearGradient id="neon-glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="50%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
  </defs>
</svg>
"""
    
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_template)
    print("SVG terminal image updated.")
    
    # 3. Update README.md
    if os.path.exists(readme_path):
        with open(readme_path, "r", encoding="utf-8") as f:
            readme_content = f.read()
            
        current_time = int(time.time())
        
        # Update SVG Section
        svg_replacement = f"""<!-- START_SECTION:activity_svg -->
<p align="center">
  <a href="https://github.com/Kgr0831/kgr0831.github.io/commits/main">
    <img src="assets/commits_terminal.svg?v={current_time}" alt="Garam's Recent Activity" width="100%">
  </a>
</p>
<!-- END_SECTION:activity_svg -->"""
        
        readme_content = re.sub(
            r"<!-- START_SECTION:activity_svg -->.*?<!-- END_SECTION:activity_svg -->",
            svg_replacement,
            readme_content,
            flags=re.DOTALL
        )
        
        # Update Markdown List Section
        list_items = []
        for c in commits:
            if c["hash"] != "-------":
                t_str = f" ({c['time']})" if c['time'] else ""
                list_items.append(f"- **{c['hash']}** - {c['msg']}{t_str}")
        
        list_content = "\n".join(list_items)
        list_replacement = f"""<!-- START_SECTION:activity_list -->
{list_content}
<!-- END_SECTION:activity_list -->"""
        
        readme_content = re.sub(
            r"<!-- START_SECTION:activity_list -->.*?<!-- END_SECTION:activity_list -->",
            list_replacement,
            readme_content,
            flags=re.DOTALL
        )
        
        with open(readme_path, "w", encoding="utf-8") as f:
            f.write(readme_content)
        print("README.md activity sections updated.")
    else:
        print("README.md not found.")

if __name__ == "__main__":
    main()
