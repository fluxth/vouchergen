import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";

import { Container, Row, Col } from "react-bootstrap";
import VoucherForm from "../components/VoucherForm";
import VoucherPage from "../components/VoucherPage";

import type { VoucherFormData } from "../components/VoucherForm";

type State = {
  voucherPageShown: boolean;
  formData: VoucherFormData | null;
};

const Home: NextPage<{}, State> = () => {
  const [state, setState] = useState<State>({
    voucherPageShown: false,
    formData: null,
  });

  return (
    <>
      <Head>
        <title>WiFi Voucher Generator</title>
      </Head>
      {state.voucherPageShown && state.formData ? (
        <VoucherPage
          vouchers={state.formData.vouchers}
          onBackClick={() => setState({ ...state, voucherPageShown: false })}
        />
      ) : (
        <Container>
          <Row className="justify-content-center">
            <Col className="my-4" sm={6}>
              <div className="text-center">
                <h1>WiFi Voucher Generator</h1>
                <p className="text-muted">Enter your voucher details below:</p>
              </div>
              <VoucherForm
                onSubmit={(data) =>
                  setState({
                    ...state,
                    voucherPageShown: true,
                    formData: data,
                  })
                }
              />
              <hr className="mt-4" />
              <p className="text-muted text-center">&copy; 2021, fluxth</p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Home;
