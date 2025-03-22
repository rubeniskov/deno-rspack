import RspackDenoPlugin from 'jsr:@snowman/rspack-deno-plugin@^1.0.2';
import { createRsbuild } from 'npm:@rsbuild/core@^1.2.16';
import { pluginReact } from 'npm:@rsbuild/plugin-react@^1.1.1';

const rsbuild = await createRsbuild({
  rsbuildConfig: {
    plugins: [pluginReact({
      swcReactOptions: {
        importSource: '@emotion/react',
      },
    })],
    tools: {
      swc: {
        jsc: {
          experimental: {
            plugins: [['@swc/plugin-emotion', {}]]
          }
        }
      },
      rspack: {
        plugins: [new RspackDenoPlugin()],
      },
    }
  },
});

const command = Deno.args[0]; // Get the first argument

if (command === "build") {
  console.log("Running build...");
  await rsbuild.build();
} else if (command === "preview") {
  console.log("Starting preview...");
  await rsbuild.preview();
} else if (command === "dev") {
  console.log("Starting dev server...");
  await rsbuild.startDevServer();
} else {
  console.error("Invalid command! Use one of: build, preview, dev");
  Deno.exit(1);
}
