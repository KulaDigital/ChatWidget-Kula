#!/usr/bin/env node
/**
 * Dual-build script for building both React app and embeddable widget
 */
import { spawn } from 'child_process';

async function run(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      env: { ...process.env, ...env },
      shell: true
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

async function build() {
  try {
    console.log('🔨 Building React app...');
    await run('vite', ['build', '--mode', 'production']);

    console.log('\n📦 Building embeddable widget...');
    await run('vite', ['build', '--mode', 'production'], {
      VITE_BUILD_TARGET: 'widget'
    });

    console.log('\n✅ All builds completed successfully!');
    console.log('📁 Output in dist/:');
    console.log('   - index.html (React demo app)');
    console.log('   - widget.js (Embeddable widget)');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();
