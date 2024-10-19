import {Logo} from "../particles/Logo";
import CodeBlock from "../particles/CodeBlock";
import scriptImg from "../images/script-1.png"

import Img1 from "../images/grafana-1.png"
import Img2 from "../images/grafana-2.png"
import Img3 from "../images/grafana-3.png"
import Img4 from "../images/grafana-4.png"
import Img5 from "../images/grafana-5.png"
import Img6 from "../images/grafana-6.png"


export const InstallingManual = () => {

    const installingCode = {
        "1": `sudo apt update
sudo apt-get update
sudo apt install curl git make jq build-essential gcc unzip wget lz4 aria2 -y`,

        "2": `wget https://github.com/piplabs/story-geth/releases/download/v0.9.4/geth-linux-amd64
chmod +x geth-linux-amd64
mv $HOME/geth-linux-amd64 $HOME/go/bin/story-geth`,

        "3": `[ ! -d "$HOME/go/bin" ] && mkdir -p $HOME/go/bin
if ! grep -q "$HOME/go/bin" $HOME/.bash_profile; then
  echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile
fi`,

        "4": `chmod +x geth-linux-amd64
mv $HOME/geth-linux-amd64 $HOME/go/bin/story-geth`,

        "5": `story-geth version`,

        "6": `wget https://story-geth-binaries.s3.us-west-1.amazonaws.com/story-public/story-linux-amd64-0.11.0-aac4bfe.tar.gz
tar -xzvf story-linux-amd64-0.11.0-aac4bfe.tar.gz`,

        "7": `sudo cp $HOME/story-linux-amd64-0.11.0-aac4bfe/story $HOME/go/bin
story version`,

        "8": `story init --network iliad --moniker "$NODE_MONIKER"`,

        "9": `sudo tee /etc/systemd/system/story-geth.service > /dev/null <<EOF
[Unit]
Description=Story Geth Client
After=network.target

[Service]
User=root
ExecStart=/root/go/bin/story-geth --iliad --syncmode full
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF`,

        "10": `sudo tee /etc/systemd/system/story.service > /dev/null <<EOF
[Unit]
Description=Story Consensus Client
After=network.target

[Service]
User=root
ExecStart=/root/go/bin/story run
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF`,

        "11": `sudo systemctl daemon-reload
sudo systemctl enable story
sudo systemctl enable story-geth`
    };


    return (
        <div className={"container"}>
            <nav className="nav">
                <Logo/>
                <ul>
                    <li><a href='/install-node'>Install node</a></li>
                    <li><a href='/snapshots'>Download snapshots</a></li>
                    <li><a href='https://x.com/StoryProtocol' target='_blank'>Twitter</a></li>
                    <li><a href="https://docs.story.foundation/" target='_blank'>Docs</a></li>
                    <li><a href="https://discord.gg/storyprotocol" target='_blank'>Discord</a></li>
                </ul>
            </nav>

            <h1 style={{
                marginTop: "120px"
            }}>
                Node manual
            </h1>

            <div className={"manual"}>
                <h2>
                    Installing story node
                </h2>
                <CodeBlock
                    codeText={'FILE=\"story.sh\" && curl -L http://65.109.159.109/story/$FILE -o $FILE && chmod +x $FILE && bash -i $FILE'}
                    comment={"After running the script, choose first option"}/>

                <img src={scriptImg} alt={"image"}/>


                <h2>
                    Installing story node without script
                </h2>

                <h4>
                    Installing dependencies
                </h4>
                <CodeBlock
                    codeText={installingCode["1"]}
                    comment={"Updating package list and installing necessary dependencies"}
                />

                <h4>
                    Downloading Story-Geth binary
                </h4>
                <CodeBlock
                    codeText={installingCode["2"]}
                    comment={"Downloading the Story-Geth binary and verifying installation"}
                />

                <h4>
                    Setting up Go bin path
                </h4>
                <CodeBlock
                    codeText={installingCode["3"]}
                    comment={"Ensure go/bin path is included in bash profile"}
                />

                <h4>
                    Setting executable permissions for Story-Geth
                </h4>
                <CodeBlock
                    codeText={installingCode["4"]}
                    comment={"Make the Story-Geth binary executable and move it to the go/bin directory"}
                />

                <h4>
                    Verifying Story-Geth installation
                </h4>
                <CodeBlock
                    codeText={installingCode["5"]}
                    comment={"Check that Story-Geth is successfully installed"}
                />

                <h4>
                    Downloading Story binary
                </h4>
                <CodeBlock
                    codeText={installingCode["6"]}
                    comment={"Download and extract the Story binary"}
                />

                <h4>
                    Installing Story binary
                </h4>
                <CodeBlock
                    codeText={installingCode["7"]}
                    comment={"Move the Story binary to the go/bin directory and verify installation"}
                />

                <h4>
                    Initializing Story node
                </h4>
                <CodeBlock
                    codeText={installingCode["8"]}
                    comment={"Initialize the Story node with your moniker"}
                />

                <h4>
                    Creating Story-Geth service
                </h4>
                <CodeBlock
                    codeText={installingCode["9"]}
                    comment={"Create the systemd service for Story-Geth"}
                />

                <h4>
                    Creating Story service
                </h4>
                <CodeBlock
                    codeText={installingCode["10"]}
                    comment={"Create the systemd service for Story Consensus Client"}
                />

                <h4>
                    Enabling services
                </h4>
                <CodeBlock
                    codeText={installingCode["11"]}
                    comment={"Enable and reload the services"}
                />

                <h2>Setting up grafana dashboard</h2>

                <h4>
                    Install Prometheus
                </h4>

                <CodeBlock
                    codeText={`cd $HOME
curl -s https://api.github.com/repos/prometheus/prometheus/releases/latest | \\
grep browser_download_url | grep linux-amd64 | cut -d '"' -f 4 | wget -qi -
tar xfz prometheus-2.*.*tar.gz
rm $HOME/prometheus-2.*.*tar.gz
mv prometheus-2.* prometheus
sudo cp ~/prometheus/prometheus /usr/local/bin/`}
                />

                <h4>
                    Create service file for Prometheus
                </h4>
                <CodeBlock
                    codeText={`sudo tee /etc/systemd/system/prometheusd.service << EOF
[Unit]
Description=Prometheus 
After=network-online.target

[Service]
User=$USER
ExecStart=$(which prometheus) --config.file="$HOME/prometheus/prometheus.yml"
RestartSec=10
Restart=on-failure
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF`}
                />


                <h4>Reload and start Prometheus</h4>

                <CodeBlock
                    codeText={`systemctl daemon-reload
sudo systemctl enable prometheusd.service
sudo systemctl restart prometheusd.service
sudo systemctl status prometheusd.service
sudo journalctl -u prometheusd.service -fn 50 -o cat`}
                />

                <h4>
                    Install node exporter
                </h4>

                <CodeBlock
                    codeText={`cd $HOME
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz
tar xzf node_exporter-1.6.1.linux-amd64.tar.gz
chmod +x node_exporter-1.6.1.linux-amd64/node_exporter
sudo mv ~/node_exporter-1.6.1.linux-amd64/node_exporter /usr/local/bin/
rm -rf node_exporter-1.6.1.linux-amd64 node_exporter-1.6.1.linux-amd64.tar.gz`}
                />

                <h4>Create service file for node exporter</h4>

                <CodeBlock
                    codeText={`sudo tee /etc/systemd/system/node-exporterd.service << EOF
[Unit]
Description=Node-Exporter 
After=network-online.target

[Service]
User=$USER
ExecStart=$(which node_exporter)
RestartSec=10
Restart=on-failure
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF`}
                />

                <h4>Reload and start node service</h4>
                <CodeBlock
                    codeText={`systemctl daemon-reload
sudo systemctl enable node-exporterd.service
sudo systemctl restart node-exporterd.service
sudo systemctl status node-exporterd.service
sudo journalctl -u node-exporterd.service -fn 50 -o cat`}
                />

                <h4>Setup Prometheus config</h4>

                <CodeBlock
                    codeText={`nano $HOME/prometheus/prometheus.yml`}
                />

                <CodeBlock
                    codeText={`
  - job_name: 'story-node'
    static_configs:
      - targets: ['localhost:26660']`}
                    comment={"Add text below and save"}
                />

                <h4>
                    Restart prometheus services
                </h4>
                <CodeBlock
                    codeText={`sudo systemctl restart  prometheusd.service
sudo systemctl status prometheusd.service`}
                />


                <h4>Install Grafana</h4>
                <CodeBlock
                    codeText={`sudo apt-get install -y apt-transport-https
sudo apt-get install -y software-properties-common wget
sudo wget -q -O /usr/share/keyrings/grafana.key https://apt.grafana.com/gpg.key
echo "deb [signed-by=/usr/share/keyrings/grafana.key] https://apt.grafana.com beta main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt-get update
sudo apt-get install grafana-enterprise`}
                />

                <h4>
                    Reload and start node service
                </h4>

                <CodeBlock
                    codeText={`sudo systemctl daemon-reload
sudo systemctl enable grafana-servers
sudo systemctl start grafana-server
sudo systemctl status grafana-server`}
                />

                <h4>Setting up dashboard</h4>
                <CodeBlock
                    codeText={`nano $HOME/.story/story/config/config.toml`}
                />

                <CodeBlock
                    codeText={"prometheus = true"}
                    comment={"Set up prometheus to true"}
                />

                <h4>
                    Connect to Grafana
                </h4>

                <p className={"small"}>Open browser and go to http://YOUR_IP:3000</p>

                <p className={"small"}>Login: admin, Password: admin</p>
                <img src={Img1} className={"simple_img"} alt="img"/>


                <h4>On Home page click Connections - Data Sources - Add data source and click on Prometheus
                </h4>

                <img src={Img3} className={"simple_img"} alt="img"/>

                <h4>In connection type: http://localhost:9090, setup name and click Save & test in the end of the
                    page </h4>
                <img src={Img4} className={"simple_img"} alt="img"/>
                <img src={Img5} className={"simple_img"} alt="img"/>

                <h4>Go to Dashboards - New - Import</h4>
                <img src={Img6} className={"simple_img"} alt="img"/>


                <h2>
                    Useful commands
                </h2>

                <h4>Check logs</h4>
                <CodeBlock
                    codeText={"sudo journalctl -u story-geth -f -o cat"}
                />
                <CodeBlock
                    codeText={"sudo journalctl -u story -f -o cat"}
                />

                <h4>Stop node</h4>
                <CodeBlock
                    codeText={"sudo systemctl stop story\n" +
                        "sudo systemctl stop story-geth"}
                />

                <h4>
                    Restart node
                </h4>
                <CodeBlock
                    codeText={"sudo systemctl start story\n" +
                        "sudo systemctl start story-geth"}
                />

                <h4>
                    Check node's status
                </h4>
                <CodeBlock
                    codeText={"curl localhost:26657/status | jq"}
                />

                <h4>
                    Uninstall node
                </h4>
                <CodeBlock
                    codeText={"sudo systemctl stop story-geth\n" +
                        "sudo systemctl stop story\n" +
                        "sudo systemctl disable story-geth\n" +
                        "sudo systemctl disable story\n" +
                        "sudo rm /etc/systemd/system/story-geth.service\n" +
                        "sudo rm /etc/systemd/system/story.service\n" +
                        "sudo systemctl daemon-reload\n" +
                        "sudo rm -rf $HOME/.story\n" +
                        "sudo rm $HOME/go/bin/story-geth\n" +
                        "sudo rm $HOME/go/bin/story"}
                />


            </div>
        </div>
    )
}