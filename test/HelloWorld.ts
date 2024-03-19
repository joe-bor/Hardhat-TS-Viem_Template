import { expect } from "chai";
import { viem } from "hardhat";

describe("HelloWorld", function () {
  it("Should give a Hello World", async () => {
    const helloWorldContract = await viem.deployContract("HelloWorld");
    const helloWorldText = await helloWorldContract.read.helloWorld();
    expect(helloWorldText).to.eq("Hello World!");
  });

  it("Should change text correctly", async function () {
    const helloWorldContract = await viem.deployContract("HelloWorld");
    const helloWorldText = await helloWorldContract.read.helloWorld();
    //TODO - create a transaction
    const tx = await helloWorldContract.write.setText([
      "I changed it to Potato!",
    ]);
    const publicClient = await viem.getPublicClient();
    const receipt = await publicClient.getTransactionReceipt({ hash: tx });
    const helloWorldText2 = await helloWorldContract.read.helloWorld();
    expect(helloWorldText2).to.eq("I changed it to Potato!");
  });
});
