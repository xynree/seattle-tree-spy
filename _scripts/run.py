import sys
import subprocess
from pathlib import Path

SCRIPTS_DIR = Path(__file__).parent

if len(sys.argv) < 2:
    print("Usage: pnpm run py <scriptname>.py")
    sys.exit(1)

script_name = sys.argv[1]

# Add .py extension if not provided
if not script_name.endswith(".py"):
    script_name += ".py"
    
script_path = SCRIPTS_DIR / script_name

if not script_path.exists():
    print(f"Script {_scripts_name} not found in _scripts/")
    sys.exit(1)

subprocess.run([sys.executable, str(script_path)])